export interface HealthResponse {
  status: "ok";
}

export type Team = "A" | "B";

export interface Player {
  id: string;
  name: string;
  isHost: boolean;
  team: Team | null;
}

export interface RoomState {
  code: string;
  players: Player[];
}

export interface CreateRoomPayload {
  name: string;
}

export interface JoinRoomPayload {
  name: string;
  roomCode: string;
}

export interface SetTeamPayload {
  team: Team;
}

export type RoomErrorCode =
  | "invalid-name"
  | "invalid-room-code"
  | "room-not-found"
  | "room-full"
  | "already-in-room"
  | "server-unavailable"
  | "request-timeout";

export type RoomActionResponse =
  | { ok: true; room: RoomState }
  | { ok: false; error: RoomErrorCode };

export type TeamActionError = "invalid-team" | "not-in-room" | "server-unavailable" | "request-timeout";

export type TeamActionResponse =
  | { ok: true }
  | { ok: false; error: TeamActionError };

export interface ClientToServerEvents {
  "room:create": (
    payload: CreateRoomPayload,
    acknowledge: (response: RoomActionResponse) => void
  ) => void;
  "room:join": (
    payload: JoinRoomPayload,
    acknowledge: (response: RoomActionResponse) => void
  ) => void;
  "room:set-team": (
    payload: SetTeamPayload,
    acknowledge: (response: TeamActionResponse) => void
  ) => void;
}

export interface ServerToClientEvents {
  "room:state": (room: RoomState) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  roomCode?: string;
}
