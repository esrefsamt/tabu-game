import type { Server, Socket } from "socket.io";
import { randomUUID } from "node:crypto";
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
import { PlayerSessionManager, type SessionClock } from "../rooms/PlayerSessionManager.js";
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
const HISTORY_PROFILE_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

function broadcastRoomState(io: TabuServer, rooms: RoomManager, sessions: PlayerSessionManager, roomCode: string, room: RoomState): void {
  io.to(roomCode).emit("room:state", room);
  for (const socketId of io.sockets.adapter.rooms.get(roomCode) ?? []) {
    const playerId = sessions.current(socketId)?.playerId;
    const view = playerId ? rooms.getPersonalGameView(roomCode, playerId) : null;
    if (view) {
      io.to(socketId).emit("game:view", view);
    }
  }
}

export function registerRoomHandlers(io: TabuServer, rooms: RoomManager, sessionClock?: SessionClock): void {
  const sessions = new PlayerSessionManager((roomCode, playerId) => {
    const room = rooms.removePlayer(roomCode, playerId);
    if (room) broadcastRoomState(io, rooms, sessions, roomCode, room);
  }, sessionClock);
  rooms.setStatePublisher((roomCode, room) => broadcastRoomState(io, rooms, sessions, roomCode, room));
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
      const historyProfileId = isRecord(payload) ? payload.historyProfileId : null;
      if (typeof historyProfileId !== "string" || !HISTORY_PROFILE_PATTERN.test(historyProfileId)) {
        respond(acknowledge, errorResponse("invalid-history-profile"));
        return;
      }

      const playerId = randomUUID();
      const room = rooms.createRoom(playerId, name, historyProfileId);
      const sessionToken = sessions.create(room.code, playerId, socket.id);
      socket.data.roomCode = room.code;
      socket.data.playerId = playerId;
      await socket.join(room.code);
      broadcastRoomState(io, rooms, sessions, room.code, room);
      respond(acknowledge, { ok: true, room, playerId, sessionToken });
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

      const playerId = randomUUID();
      const result = rooms.joinRoom(playerId, name, rawRoomCode);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      const sessionToken = sessions.create(result.room.code, playerId, socket.id);
      socket.data.roomCode = result.room.code;
      socket.data.playerId = playerId;
      await socket.join(result.room.code);
      broadcastRoomState(io, rooms, sessions, result.room.code, result.room);
      respond(acknowledge, { ok: true, room: result.room, playerId, sessionToken });
    });

    socket.on("room:resume", async (payload, acknowledge) => {
      if (sessions.current(socket.id)) {
        respond(acknowledge, { ok: false, error: "already-in-room" });
        return;
      }
      const roomCode = isRecord(payload) && typeof payload.roomCode === "string"
        ? payload.roomCode.trim().toUpperCase() : "";
      const token = isRecord(payload) ? payload.sessionToken : null;
      if (!ROOM_CODE_PATTERN.test(roomCode) || typeof token !== "string" || !/^[0-9a-f]{64}$/i.test(token)) {
        respond(acknowledge, { ok: false, error: "invalid-session" });
        return;
      }
      if (!rooms.hasRoom(roomCode)) {
        respond(acknowledge, { ok: false, error: "room-not-found" });
        return;
      }
      const resumed = sessions.resume(roomCode, token, socket.id);
      if (!resumed || !rooms.hasPlayer(roomCode, resumed.playerId)) {
        respond(acknowledge, { ok: false, error: "invalid-session" });
        return;
      }
      if (resumed.previousSocketId && resumed.previousSocketId !== socket.id) {
        const previous = io.sockets.sockets.get(resumed.previousSocketId);
        if (previous) {
          previous.data.roomCode = undefined;
          previous.data.playerId = undefined;
          previous.leave(roomCode);
          previous.emit("room:session-moved");
        }
      }
      socket.data.roomCode = roomCode;
      socket.data.playerId = resumed.playerId;
      await socket.join(roomCode);
      const room = rooms.reconnectPlayer(roomCode, resumed.playerId)!;
      broadcastRoomState(io, rooms, sessions, roomCode, room);
      respond(acknowledge, { ok: true, room, playerId: resumed.playerId });
    });

    socket.on("room:leave", (acknowledge) => {
      const removed = sessions.remove(socket.id);
      if (!removed) {
        respond(acknowledge, { ok: false, error: "not-in-room" });
        return;
      }
      socket.data.roomCode = undefined;
      socket.data.playerId = undefined;
      socket.leave(removed.roomCode);
      const room = rooms.removePlayer(removed.roomCode, removed.playerId);
      if (room) broadcastRoomState(io, rooms, sessions, removed.roomCode, room);
      respond(acknowledge, { ok: true });
    });

    socket.on("room:move-player", (payload, acknowledge) => {
      const session = sessions.current(socket.id);
      if (!session) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies MovePlayerResponse);
        return;
      }

      const { roomCode, playerId } = session;
      const result = rooms.movePlayer(roomCode, playerId, payload);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      broadcastRoomState(io, rooms, sessions, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies MovePlayerResponse);
    });

    socket.on("room:set-captain", (payload, acknowledge) => {
      const session = sessions.current(socket.id);
      if (!session) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies CaptainActionResponse);
        return;
      }

      const { roomCode, playerId } = session;
      const result = rooms.setCaptain(roomCode, playerId, payload);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      broadcastRoomState(io, rooms, sessions, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies CaptainActionResponse);
    });

    socket.on("room:update-settings", (payload, acknowledge) => {
      const session = sessions.current(socket.id);
      if (!session) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies SettingsActionResponse);
        return;
      }

      const { roomCode, playerId } = session;
      const result = rooms.updateSettings(roomCode, playerId, payload);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      broadcastRoomState(io, rooms, sessions, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies SettingsActionResponse);
    });

    socket.on("game:start", (acknowledge) => {
      const session = sessions.current(socket.id);
      if (!session) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies GameStartResponse);
        return;
      }

      const { roomCode, playerId } = session;
      const result = rooms.startGame(roomCode, playerId);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      broadcastRoomState(io, rooms, sessions, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies GameStartResponse);
    });

    socket.on("game:return-to-lobby", (acknowledge) => {
      const session = sessions.current(socket.id);
      if (!session) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies ReturnToLobbyResponse);
        return;
      }

      const { roomCode, playerId } = session;
      const result = rooms.returnToLobby(roomCode, playerId);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      broadcastRoomState(io, rooms, sessions, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies ReturnToLobbyResponse);
    });

    socket.on("game:start-round", (acknowledge) => {
      const session = sessions.current(socket.id);
      if (!session) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies RoundStartResponse);
        return;
      }

      const { roomCode, playerId } = session;
      const result = rooms.startRound(roomCode, playerId);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      broadcastRoomState(io, rooms, sessions, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies RoundStartResponse);
    });

    socket.on("game:card-action", (payload, acknowledge) => {
      const session = sessions.current(socket.id);
      if (!session) {
        respond(acknowledge, { ok: false, error: "not-in-room" } satisfies CardActionResponse);
        return;
      }

      const { roomCode, playerId } = session;
      const result = rooms.cardAction(roomCode, playerId, payload);
      if (!result.ok) {
        respond(acknowledge, result);
        return;
      }

      io.to(roomCode).emit("game:card-result", result.cardResult);
      broadcastRoomState(io, rooms, sessions, roomCode, result.room);
      respond(acknowledge, { ok: true } satisfies CardActionResponse);
    });

    socket.on("disconnect", () => {
      const session = sessions.disconnect(socket.id);
      if (!session) return;
      const { roomCode, playerId } = session;
      const room = rooms.temporarilyDisconnectPlayer(roomCode, playerId);
      if (room) {
        broadcastRoomState(io, rooms, sessions, roomCode, room);
      }
    });
  });
}
