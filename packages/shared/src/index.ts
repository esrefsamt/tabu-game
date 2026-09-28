export interface HealthResponse {
  status: "ok";
}

export type Team = "A" | "B";
export type RoundDurationSeconds = 30 | 45 | 60 | 90 | 120;
export type PassLimit = 0 | 1 | 2 | 3 | 4 | 5 | 10;

export interface RoomSettings {
  roundDurationSeconds: RoundDurationSeconds;
  passLimit: PassLimit;
}

export interface Player {
  id: string;
  name: string;
  isHost: boolean;
  team: Team | null;
}

export interface RoomState {
  code: string;
  players: Player[];
  captainAId: string | null;
  captainBId: string | null;
  settings: RoomSettings;
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

export interface SetCaptainPayload {
  team: Team;
  captainId: string | null;
}

export type UpdateRoomSettingsPayload =
  | { setting: "roundDurationSeconds"; value: RoundDurationSeconds }
  | { setting: "passLimit"; value: PassLimit };

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

export type CaptainActionError =
  | "invalid-team"
  | "invalid-captain"
  | "not-in-room"
  | "not-host"
  | "server-unavailable"
  | "request-timeout";

export type CaptainActionResponse =
  | { ok: true }
  | { ok: false; error: CaptainActionError };

export type SettingsActionError =
  | "invalid-settings"
  | "not-in-room"
  | "not-host"
  | "server-unavailable"
  | "request-timeout";

export type SettingsActionResponse =
  | { ok: true }
  | { ok: false; error: SettingsActionError };

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
  "room:set-captain": (
    payload: SetCaptainPayload,
    acknowledge: (response: CaptainActionResponse) => void
  ) => void;
  "room:update-settings": (
    payload: UpdateRoomSettingsPayload,
    acknowledge: (response: SettingsActionResponse) => void
  ) => void;
}

export interface ServerToClientEvents {
  "room:state": (room: RoomState) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  roomCode?: string;
}
