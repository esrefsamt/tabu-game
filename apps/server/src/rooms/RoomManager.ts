import { randomInt } from "node:crypto";
import type {
  CaptainActionError,
  Player,
  RoomSettings,
  RoomState,
  RoundDurationSeconds,
  SettingsActionError,
  TeamActionError
} from "@tabu/shared";

const ROOM_CODE_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const ROOM_CODE_LENGTH = 6;
const MAX_PLAYERS = 10;
const ROUND_DURATIONS: readonly RoundDurationSeconds[] = [30, 45, 60, 90, 120];
const PASS_LIMITS = [0, 1, 2, 3, 4, 5, 10] as const;
const DEFAULT_ROOM_SETTINGS: RoomSettings = {
  roundDurationSeconds: 60,
  passLimit: 3
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
  | { ok: false; error: "invalid-room-code" | "room-not-found" | "room-full" };

export type TeamChangeResult =
  | { ok: true; room: RoomState }
  | { ok: false; error: TeamActionError };

export type CaptainChangeResult =
  | { ok: true; room: RoomState }
  | { ok: false; error: CaptainActionError };

export type SettingsChangeResult =
  | { ok: true; room: RoomState }
  | { ok: false; error: SettingsActionError };

export class RoomManager {
  private readonly rooms = new Map<string, Room>();

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

  removePlayer(roomCode: string, playerId: string): RoomState | null {
    const room = this.rooms.get(roomCode);
    if (!room || !room.players.delete(playerId)) {
      return null;
    }

    if (room.players.size === 0) {
      this.rooms.delete(roomCode);
      return null;
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
    return {
      code: room.code,
      captainAId: room.captainAId,
      captainBId: room.captainBId,
      settings: { ...room.settings },
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
