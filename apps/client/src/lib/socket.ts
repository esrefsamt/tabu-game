import { useSyncExternalStore } from "react";
import { io, type Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  RoomActionResponse,
  RoomState,
  ServerToClientEvents,
  Team,
  TeamActionResponse
} from "@tabu/shared";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.VITE_SOCKET_URL || "/",
  { autoConnect: true }
);

let activeRoom: RoomState | null = null;
const unassignedRoomStates = new Map<string, RoomState>();
const roomStateListeners = new Set<() => void>();

function notifyRoomStateListeners(): void {
  roomStateListeners.forEach((listener) => listener());
}

function setActiveRoom(room: RoomState | null): void {
  activeRoom = room;
  notifyRoomStateListeners();
}

socket.on("room:state", (room) => {
  if (activeRoom?.code === room.code) {
    setActiveRoom(room);
  } else if (!activeRoom) {
    unassignedRoomStates.set(room.code, room);
  }
});

socket.on("disconnect", () => {
  unassignedRoomStates.clear();
  setActiveRoom(null);
});

export function getActiveRoom(): RoomState | null {
  return activeRoom;
}

export function subscribeToRoomState(listener: () => void): () => void {
  roomStateListeners.add(listener);
  return () => {
    roomStateListeners.delete(listener);
  };
}

function requestRoomAction(
  emit: (acknowledge: (response: RoomActionResponse) => void) => void
): Promise<RoomActionResponse> {
  if (!socket.connected) {
    return Promise.resolve({ ok: false, error: "server-unavailable" });
  }

  return new Promise((resolve) => {
    let completed = false;
    const timeout = window.setTimeout(() => {
      if (!completed) {
        completed = true;
        resolve({ ok: false, error: "request-timeout" });
      }
    }, 8000);

    emit((response) => {
      if (completed) {
        return;
      }
      completed = true;
      window.clearTimeout(timeout);
      if (response.ok) {
        const latestRoomState = unassignedRoomStates.get(response.room.code);
        unassignedRoomStates.clear();
        setActiveRoom(latestRoomState ?? response.room);
      }
      resolve(response);
    });
  });
}

export function createRoom(name: string): Promise<RoomActionResponse> {
  return requestRoomAction((acknowledge) => {
    socket.emit("room:create", { name }, acknowledge);
  });
}

export function joinRoom(name: string, roomCode: string): Promise<RoomActionResponse> {
  return requestRoomAction((acknowledge) => {
    socket.emit("room:join", { name, roomCode }, acknowledge);
  });
}

export function changeTeam(team: Team): Promise<TeamActionResponse> {
  if (!socket.connected) {
    return Promise.resolve({ ok: false, error: "server-unavailable" });
  }

  return new Promise((resolve) => {
    let completed = false;
    const timeout = window.setTimeout(() => {
      if (!completed) {
        completed = true;
        resolve({ ok: false, error: "request-timeout" });
      }
    }, 8000);

    socket.emit("room:set-team", { team }, (response) => {
      if (completed) {
        return;
      }
      completed = true;
      window.clearTimeout(timeout);
      resolve(response);
    });
  });
}

export function useRoomState(): RoomState | null {
  return useSyncExternalStore(subscribeToRoomState, getActiveRoom, getActiveRoom);
}
