import { randomInt } from "node:crypto";
import type {
  CardActionError,
  CaptainActionError,
  GameStartError,
  PersonalGameView,
  Player,
  PublicGameState,
  RoomSettings,
  RoomState,
  RoundStartError,
  RoundDurationSeconds,
  SettingsActionError,
  TeamActionError
} from "@tabu/shared";
import { RoomDeckStore } from "../cards/RoomDeckStore.js";
import { TurnEngine } from "../game/TurnEngine.js";
import { RoundEngine, systemRoundClock, type RoundClock } from "../game/RoundEngine.js";

const ROOM_CODE_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const ROOM_CODE_LENGTH = 6;
const MAX_PLAYERS = 10;
const ROUND_DURATIONS: readonly RoundDurationSeconds[] = [30, 45, 60, 90, 120];
const PASS_LIMITS = [0, 1, 2, 3, 4, 5, 10] as const;
const DEFAULT_ROOM_SETTINGS: RoomSettings = {
  roundDurationSeconds: 60,
  passLimit: 3
};
const LOBBY_GAME_STATE: PublicGameState = {
  phase: "lobby",
  activeTeam: null,
  clueGiverId: null,
  error: null,
  scores: { A: 0, B: 0 },
  roundId: null,
  roundEndsAt: null,
  passesUsed: 0
};

interface Room {
  code: string;
  hostId: string;
  players: Map<string, Omit<Player, "isHost">>;
  captainAId: string | null;
  captainBId: string | null;
  settings: RoomSettings;
}

export type JoinRoomResult =
  | { ok: true; room: RoomState }
  | { ok: false; error: "invalid-room-code" | "room-not-found" | "room-full" | "game-already-started" };

export type TeamChangeResult =
  | { ok: true; room: RoomState }
  | { ok: false; error: TeamActionError };

export type CaptainChangeResult =
  | { ok: true; room: RoomState }
  | { ok: false; error: CaptainActionError };

export type SettingsChangeResult =
  | { ok: true; room: RoomState }
  | { ok: false; error: SettingsActionError };

export type GameStartResult =
  | { ok: true; room: RoomState }
  | { ok: false; error: GameStartError };

export type RoundStartResult =
  | { ok: true; room: RoomState }
  | { ok: false; error: RoundStartError };

export type CardActionResult =
  | { ok: true; room: RoomState }
  | { ok: false; error: CardActionError };

export class RoomManager {
  private readonly rooms = new Map<string, Room>();
  private readonly decks = new RoomDeckStore();
  private readonly turnEngines = new Map<string, TurnEngine>();
  private readonly roundEngines = new Map<string, RoundEngine>();
  private statePublisher: ((roomCode: string, room: RoomState) => void) | null = null;

  constructor(private readonly roundClock: RoundClock = systemRoundClock) {}

  setStatePublisher(publisher: (roomCode: string, room: RoomState) => void): void {
    this.statePublisher = publisher;
  }

  createRoom(playerId: string, name: string): RoomState {
    const code = this.createUniqueCode();
    const room: Room = {
      code,
      hostId: playerId,
      players: new Map([[playerId, { id: playerId, name, team: null }]]),
      captainAId: null,
      captainBId: null,
      settings: { ...DEFAULT_ROOM_SETTINGS }
    };

    this.rooms.set(code, room);
    this.decks.create(code);
    return this.toRoomState(room);
  }

  joinRoom(playerId: string, name: string, rawRoomCode: string): JoinRoomResult {
    const roomCode = rawRoomCode.trim().toUpperCase();
    if (!this.isValidRoomCode(roomCode)) {
      return { ok: false, error: "invalid-room-code" };
    }

    const room = this.rooms.get(roomCode);
    if (!room) {
      return { ok: false, error: "room-not-found" };
    }

    if (this.turnEngines.has(roomCode)) {
      return { ok: false, error: "game-already-started" };
    }

    if (!room.players.has(playerId) && room.players.size >= MAX_PLAYERS) {
      return { ok: false, error: "room-full" };
    }

    room.players.set(playerId, { id: playerId, name, team: null });
    return { ok: true, room: this.toRoomState(room) };
  }

  setPlayerTeam(roomCode: string, playerId: string, requestedTeam: unknown): TeamChangeResult {
    if (requestedTeam !== "A" && requestedTeam !== "B") {
      return { ok: false, error: "invalid-team" };
    }

    const room = this.rooms.get(roomCode);
    const player = room?.players.get(playerId);
    if (!room || !player) {
      return { ok: false, error: "not-in-room" };
    }
    if (this.turnEngines.has(roomCode)) {
      return { ok: false, error: "game-already-started" };
    }

    player.team = requestedTeam;
    if (requestedTeam !== "A" && room.captainAId === playerId) {
      room.captainAId = null;
    }
    if (requestedTeam !== "B" && room.captainBId === playerId) {
      room.captainBId = null;
    }
    return { ok: true, room: this.toRoomState(room) };
  }

  setCaptain(roomCode: string, requesterId: string, payload: unknown): CaptainChangeResult {
    const room = this.rooms.get(roomCode);
    if (!room?.players.has(requesterId)) {
      return { ok: false, error: "not-in-room" };
    }
    if (room.hostId !== requesterId) {
      return { ok: false, error: "not-host" };
    }
    if (this.turnEngines.has(roomCode)) {
      return { ok: false, error: "game-already-started" };
    }
    if (!isExactRecord(payload, ["team", "captainId"])) {
      return { ok: false, error: "invalid-captain" };
    }

    const { team, captainId } = payload;
    if (team !== "A" && team !== "B") {
      return { ok: false, error: "invalid-team" };
    }
    if (captainId !== null && typeof captainId !== "string") {
      return { ok: false, error: "invalid-captain" };
    }

    if (captainId !== null) {
      const candidate = room.players.get(captainId);
      if (!candidate || candidate.team !== team) {
        return { ok: false, error: "invalid-captain" };
      }
    }

    if (team === "A") {
      room.captainAId = captainId;
    } else {
      room.captainBId = captainId;
    }

    return { ok: true, room: this.toRoomState(room) };
  }

  updateSettings(roomCode: string, requesterId: string, payload: unknown): SettingsChangeResult {
    const room = this.rooms.get(roomCode);
    if (!room?.players.has(requesterId)) {
      return { ok: false, error: "not-in-room" };
    }
    if (room.hostId !== requesterId) {
      return { ok: false, error: "not-host" };
    }
    if (this.turnEngines.has(roomCode)) {
      return { ok: false, error: "game-already-started" };
    }
    if (!isExactRecord(payload, ["setting", "value"])) {
      return { ok: false, error: "invalid-settings" };
    }

    if (payload.setting === "roundDurationSeconds" && isRoundDuration(payload.value)) {
      room.settings.roundDurationSeconds = payload.value;
    } else if (payload.setting === "passLimit" && isPassLimit(payload.value)) {
      room.settings.passLimit = payload.value;
    } else {
      return { ok: false, error: "invalid-settings" };
    }

    return { ok: true, room: this.toRoomState(room) };
  }

  startGame(roomCode: string, requesterId: string): GameStartResult {
    const room = this.rooms.get(roomCode);
    if (!room?.players.has(requesterId)) {
      return { ok: false, error: "not-in-room" };
    }
    if (room.hostId !== requesterId) {
      return { ok: false, error: "not-host" };
    }
    if (this.turnEngines.has(roomCode)) {
      return { ok: false, error: "game-already-started" };
    }

    if (room.players.size < 2) {
      return { ok: false, error: "not-enough-players" };
    }

    const teamAPlayerIds = [...room.players.values()]
      .filter((player) => player.team === "A")
      .map((player) => player.id);
    const teamBPlayerIds = [...room.players.values()]
      .filter((player) => player.team === "B")
      .map((player) => player.id);
    if (teamAPlayerIds.length === 0 || teamBPlayerIds.length === 0) {
      return { ok: false, error: "teams-incomplete" };
    }
    if (room.captainAId === null || room.captainBId === null) {
      return { ok: false, error: "captains-required" };
    }
    if (teamAPlayerIds.length + teamBPlayerIds.length !== room.players.size) {
      return { ok: false, error: "players-unassigned" };
    }

    const teamACaptain = room.players.get(room.captainAId);
    const teamBCaptain = room.players.get(room.captainBId);
    if (teamACaptain?.team !== "A" || teamBCaptain?.team !== "B") {
      return { ok: false, error: "captains-required" };
    }

    this.turnEngines.set(roomCode, new TurnEngine(teamAPlayerIds, teamBPlayerIds));
    this.roundEngines.set(roomCode, new RoundEngine(
      () => this.decks.draw(roomCode),
      () => {
        const currentRoom = this.rooms.get(roomCode);
        const turns = this.turnEngines.get(roomCode);
        if (currentRoom && turns) {
          turns.advanceTurn();
          this.statePublisher?.(roomCode, this.toRoomState(currentRoom));
        }
      },
      this.roundClock
    ));
    return { ok: true, room: this.toRoomState(room) };
  }

  startRound(roomCode: string, requesterId: string): RoundStartResult {
    const room = this.rooms.get(roomCode);
    if (!room?.players.has(requesterId)) {
      return { ok: false, error: "not-in-room" };
    }

    const turns = this.turnEngines.get(roomCode);
    const round = this.roundEngines.get(roomCode);
    const turnState = turns?.publicState;
    if (turnState?.phase === "unable-to-continue") {
      return { ok: false, error: "team-unavailable" };
    }
    if (turnState?.phase !== "turn-preparation" || !round || round.isActive) {
      return { ok: false, error: "round-not-ready" };
    }
    if (turnState.clueGiverId !== requesterId) {
      return { ok: false, error: "not-clue-giver" };
    }
    if (!room.players.size || !["A", "B"].every((team) =>
      [...room.players.values()].some((player) => player.team === team))) {
      return { ok: false, error: "team-unavailable" };
    }

    round.start(room.settings.roundDurationSeconds);
    return { ok: true, room: this.toRoomState(room) };
  }

  cardAction(roomCode: string, requesterId: string, payload: unknown): CardActionResult {
    const room = this.rooms.get(roomCode);
    const player = room?.players.get(requesterId);
    if (!room || !player) {
      return { ok: false, error: "not-in-room" };
    }

    const turns = this.turnEngines.get(roomCode);
    const round = this.roundEngines.get(roomCode);
    if (!turns || !round?.isActive || round.expireIfDue()) {
      return { ok: false, error: "round-not-active" };
    }
    if (!isExactRecord(payload, ["action", "cardVersion"]) ||
        (payload.action !== "correct" && payload.action !== "pass" && payload.action !== "tabu") ||
        typeof payload.cardVersion !== "number" || !Number.isSafeInteger(payload.cardVersion) ||
        payload.cardVersion < 1) {
      return { ok: false, error: "invalid-action" };
    }

    const turnState = turns.publicState;
    const activeTeam = turnState.activeTeam;
    if (!activeTeam) {
      return { ok: false, error: "round-not-active" };
    }
    const isClueGiver = turnState.clueGiverId === requesterId;
    const opposingCaptainId = activeTeam === "A" ? room.captainBId : room.captainAId;
    const canCallTabu = isClueGiver || (requesterId === opposingCaptainId && player.team !== activeTeam);
    if (payload.action === "tabu" ? !canCallTabu : !isClueGiver) {
      return { ok: false, error: "not-authorized" };
    }

    const result = round.applyAction(payload.action, payload.cardVersion, activeTeam, room.settings.passLimit);
    if (!result.ok) {
      return result;
    }
    return { ok: true, room: this.toRoomState(room) };
  }

  getPersonalGameView(roomCode: string, playerId: string): PersonalGameView | null {
    const room = this.rooms.get(roomCode);
    const player = room?.players.get(playerId);
    if (!room || !player) {
      return null;
    }

    const round = this.roundEngines.get(roomCode);
    const turnState = this.turnEngines.get(roomCode)?.publicState;
    if (!round?.isActive || !turnState?.activeTeam) {
      return { roundId: null, cardVersion: null, currentCard: null };
    }

    const canSeeCard = playerId === turnState.clueGiverId ||
      (player.team !== null && player.team !== turnState.activeTeam);
    return {
      roundId: round.publicState.roundId,
      cardVersion: canSeeCard ? round.cardVersion : null,
      currentCard: canSeeCard ? round.currentCard : null
    };
  }

  advanceTurn(roomCode: string): RoomState | null {
    const room = this.rooms.get(roomCode);
    const engine = this.turnEngines.get(roomCode);
    if (!room || !engine || this.roundEngines.get(roomCode)?.isActive) {
      return null;
    }

    engine.advanceTurn();
    return this.toRoomState(room);
  }

  removePlayer(roomCode: string, playerId: string): RoomState | null {
    const room = this.rooms.get(roomCode);
    if (!room || !room.players.delete(playerId)) {
      return null;
    }

    if (room.players.size === 0) {
      this.roundEngines.get(roomCode)?.dispose();
      this.roundEngines.delete(roomCode);
      this.rooms.delete(roomCode);
      this.decks.remove(roomCode);
      this.turnEngines.delete(roomCode);
      return null;
    }

    const turns = this.turnEngines.get(roomCode);
    const round = this.roundEngines.get(roomCode);
    const wasActiveClueGiver = round?.isActive && turns?.publicState.clueGiverId === playerId;
    const turnState = turns?.removePlayer(playerId);
    if (round?.isActive && (wasActiveClueGiver || turnState?.phase === "unable-to-continue")) {
      round.abort();
      if (turnState?.phase !== "unable-to-continue") {
        turns?.advanceTurn();
      }
    }

    if (room.captainAId === playerId) {
      room.captainAId = null;
    }
    if (room.captainBId === playerId) {
      room.captainBId = null;
    }

    if (room.hostId === playerId) {
      const oldestRemainingPlayerId = room.players.keys().next().value;
      if (oldestRemainingPlayerId) {
        room.hostId = oldestRemainingPlayerId;
      }
    }

    return this.toRoomState(room);
  }

  private createUniqueCode(): string {
    let code = "";
    do {
      code = Array.from({ length: ROOM_CODE_LENGTH }, () =>
        ROOM_CODE_CHARACTERS[randomInt(ROOM_CODE_CHARACTERS.length)]
      ).join("");
    } while (this.rooms.has(code));

    return code;
  }

  private isValidRoomCode(roomCode: string): boolean {
    return roomCode.length === ROOM_CODE_LENGTH &&
      [...roomCode].every((character) => ROOM_CODE_CHARACTERS.includes(character));
  }

  private toRoomState(room: Room): RoomState {
    const turnState = this.turnEngines.get(room.code)?.publicState;
    const round = this.roundEngines.get(room.code);
    const roundState = round?.publicState;
    const game: PublicGameState = turnState ? {
      ...turnState,
      phase: round?.isActive ? "round-active" : turnState.phase,
      scores: roundState?.scores ?? { A: 0, B: 0 },
      roundId: roundState?.roundId ?? null,
      roundEndsAt: roundState?.roundEndsAt ?? null,
      passesUsed: roundState?.passesUsed ?? 0
    } : { ...LOBBY_GAME_STATE, scores: { ...LOBBY_GAME_STATE.scores } };
    return {
      code: room.code,
      captainAId: room.captainAId,
      captainBId: room.captainBId,
      settings: { ...room.settings },
      game,
      players: [...room.players.values()].map((player) => ({
        ...player,
        isHost: player.id === room.hostId
      }))
    };
  }
}

function isExactRecord(value: unknown, keys: readonly string[]): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const actualKeys = Object.keys(value);
  return actualKeys.length === keys.length && keys.every((key) => Object.hasOwn(value, key));
}

function isRoundDuration(value: unknown): value is RoundDurationSeconds {
  return typeof value === "number" && ROUND_DURATIONS.some((allowedValue) => allowedValue === value);
}

function isPassLimit(value: unknown): value is RoomSettings["passLimit"] {
  return typeof value === "number" && PASS_LIMITS.some((allowedValue) => allowedValue === value);
}
