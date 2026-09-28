import { randomInt } from "node:crypto";
import type { Player, RoomState, TeamActionError } from "@tabu/shared";

const ROOM_CODE_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const ROOM_CODE_LENGTH = 6;
const MAX_PLAYERS = 10;

interface Room {
  code: string;
  hostId: string;
  players: Map<string, Omit<Player, "isHost">>;
}

export type JoinRoomResult =
  | { ok: true; room: RoomState }
  | { ok: false; error: "invalid-room-code" | "room-not-found" | "room-full" };

export type TeamChangeResult =
  | { ok: true; room: RoomState }
  | { ok: false; error: TeamActionError };

export class RoomManager {
  private readonly rooms = new Map<string, Room>();

  createRoom(playerId: string, name: string): RoomState {
    const code = this.createUniqueCode();
    const room: Room = {
      code,
      hostId: playerId,
      players: new Map([[playerId, { id: playerId, name, team: null }]])
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
      players: [...room.players.values()].map((player) => ({
        ...player,
        isHost: player.id === room.hostId
      }))
    };
  }
}
