import type { Server, Socket } from "socket.io";
import type {
  ClientToServerEvents,
  CardActionResponse,
  CaptainActionResponse,
  GameStartResponse,
  InterServerEvents,
  MovePlayerResponse,
  RoomActionResponse,
  RoomErrorCode,
  RoomState,
  ReturnToLobbyResponse,
  RoundStartResponse,
  ServerToClientEvents,
  SettingsActionResponse,
  SocketData,
} from "@tabu/shared";
import { RoomManager } from "../rooms/RoomManager.js";

type TabuServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
type TabuSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

const MAX_NAME_LENGTH = 20;
const ROOM_CODE_PATTERN = /^[A-HJ-NP-Z2-9]{6}$/;

function validateName(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const name = value.trim();
  if (name.length === 0 || name.length > MAX_NAME_LENGTH) {
    return null;
  }

  return name;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function respond<Response>(acknowledge: unknown, response: Response): void {
  if (typeof acknowledge === "function") {
    (acknowledge as (result: Response) => void)(response);
  }
}

function errorResponse(error: RoomErrorCode): RoomActionResponse {
  return { ok: false, error };
}

function broadcastRoomState(io: TabuServer, rooms: RoomManager, roomCode: string, room: RoomState): void {
  io.to(roomCode).emit("room:state", room);
  for (const socketId of io.sockets.adapter.rooms.get(roomCode) ?? []) {
    const view = rooms.getPersonalGameView(roomCode, socketId);
    if (view) {
      io.to(socketId).emit("game:view", view);
    }
  }
}

export function registerRoomHandlers(io: TabuServer, rooms: RoomManager): void {
  rooms.setStatePublisher((roomCode, room) => broadcastRoomState(io, rooms, roomCode, room));
  io.on("connection", (socket: TabuSocket) => {
    socket.on("room:create", async (payload, acknowledge) => {
      if (socket.data.roomCode) {
        respond(acknowledge, errorResponse("already-in-room"));
        return;
      }

      const name = isRecord(payload) ? validateName(payload.name) : null;
      if (!name) {
        respond(acknowledge, errorResponse("invalid-name"));
        return;
      }

      const room = rooms.createRoom(socket.id, name);
      socket.data.roomCode = room.code;
      await socket.join(room.code);
      broadcastRoomState(io, rooms, room.code, room);
      respond(acknowledge, { ok: true, room });
    });

    socket.on("room:join", async (payload, acknowledge) => {
      if (socket.data.roomCode) {
        respond(acknowledge, errorResponse("already-in-room"));
        return;
      }

      const name = isRecord(payload) ? validateName(payload.name) : null;
      if (!name) {
        respond(acknowledge, errorResponse("invalid-name"));
        return;
      }

      const rawRoomCode = isRecord(payload) ? payload.roomCode : null;
      if (typeof rawRoomCode !== "string" || !ROOM_CODE_PATTERN.test(rawRoomCode.trim().toUpperCase())) {
        respond(acknowledge, errorResponse("invalid-room-code"));
        return;
      }

      const result = rooms.joinRoom(socket.id, name, rawRoomCode);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      socket.data.roomCode = result.room.code;
      await socket.join(result.room.code);
      broadcastRoomState(io, rooms, result.room.code, result.room);
      respond(acknowledge, result);
    });

    socket.on("room:move-player", (payload, acknowledge) => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies MovePlayerResponse);
        return;
      }

      const result = rooms.movePlayer(roomCode, socket.id, payload);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      broadcastRoomState(io, rooms, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies MovePlayerResponse);
    });

    socket.on("room:set-captain", (payload, acknowledge) => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies CaptainActionResponse);
        return;
      }

      const result = rooms.setCaptain(roomCode, socket.id, payload);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      broadcastRoomState(io, rooms, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies CaptainActionResponse);
    });

    socket.on("room:update-settings", (payload, acknowledge) => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies SettingsActionResponse);
        return;
      }

      const result = rooms.updateSettings(roomCode, socket.id, payload);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      broadcastRoomState(io, rooms, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies SettingsActionResponse);
    });

    socket.on("game:start", (acknowledge) => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies GameStartResponse);
        return;
      }

      const result = rooms.startGame(roomCode, socket.id);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      broadcastRoomState(io, rooms, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies GameStartResponse);
    });

    socket.on("game:return-to-lobby", (acknowledge) => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies ReturnToLobbyResponse);
        return;
      }

      const result = rooms.returnToLobby(roomCode, socket.id);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      broadcastRoomState(io, rooms, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies ReturnToLobbyResponse);
    });

    socket.on("game:start-round", (acknowledge) => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies RoundStartResponse);
        return;
      }

      const result = rooms.startRound(roomCode, socket.id);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      broadcastRoomState(io, rooms, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies RoundStartResponse);
    });

    socket.on("game:card-action", (payload, acknowledge) => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies CardActionResponse);
        return;
      }

      const result = rooms.cardAction(roomCode, socket.id, payload);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      io.to(roomCode).emit("game:card-result", result.cardResult);
      broadcastRoomState(io, rooms, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies CardActionResponse);
    });

    socket.on("disconnect", () => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) {
        return;
      }

      const room = rooms.removePlayer(roomCode, socket.id);
      if (room) {
        broadcastRoomState(io, rooms, roomCode, room);
      }
    });
  });
}

export function advanceRoomTurn(io: TabuServer, rooms: RoomManager, roomCode: string): RoomState | null {
  const room = rooms.advanceTurn(roomCode);
  if (room) {
    broadcastRoomState(io, rooms, roomCode, room);
  }
  return room;
}
