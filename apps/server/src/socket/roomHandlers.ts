import type { Server, Socket } from "socket.io";
import type {
  ClientToServerEvents,
  CaptainActionResponse,
  InterServerEvents,
  RoomActionResponse,
  RoomErrorCode,
  ServerToClientEvents,
  SettingsActionResponse,
  SocketData,
  TeamActionResponse
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

export function registerRoomHandlers(io: TabuServer, rooms: RoomManager): void {
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
      io.to(room.code).emit("room:state", room);
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
      io.to(result.room.code).emit("room:state", result.room);
      respond(acknowledge, result);
    });

    socket.on("room:set-team", (payload, acknowledge) => {
      if (!isRecord(payload) || Object.keys(payload).length !== 1 || !Object.hasOwn(payload, "team")) {
        respond(acknowledge, { ok: false, error: "invalid-team" } satisfies TeamActionResponse);
        return;
      }

      const roomCode = socket.data.roomCode;
      if (!roomCode) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies TeamActionResponse);
        return;
      }

      const result = rooms.setPlayerTeam(roomCode, socket.id, payload.team);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      io.to(roomCode).emit("room:state", result.room);
      respond(acknowledge, { ok: true } satisfies TeamActionResponse);
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

      io.to(roomCode).emit("room:state", result.room);
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

      io.to(roomCode).emit("room:state", result.room);
      respond(acknowledge, { ok: true } satisfies SettingsActionResponse);
    });

    socket.on("disconnect", () => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) {
        return;
      }

      const room = rooms.removePlayer(roomCode, socket.id);
      if (room) {
        io.to(roomCode).emit("room:state", room);
      }
    });
  });
}
