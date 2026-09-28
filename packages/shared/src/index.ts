export interface HealthResponse {
  status: "ok";
}

export type Team = "A" | "B";
export type RoundDurationSeconds = 30 | 45 | 60 | 90 | 120;
export type PassLimit = 0 | 1 | 2 | 3 | 4 | 5 | 10;

export interface TabuCard {
  readonly id: string;
  readonly word: string;
  readonly forbiddenWords: readonly [string, string, string, string, string];
}

export interface RoomSettings {
  roundDurationSeconds: RoundDurationSeconds;
  passLimit: PassLimit;
}

export type GamePhase = "lobby" | "turn-preparation" | "round-active" | "unable-to-continue";
export type GameStateError = "team-empty";
export type CardAction = "correct" | "pass" | "tabu";

export interface TeamScores {
  A: number;
  B: number;
}

export interface PublicGameState {
  phase: GamePhase;
  activeTeam: Team | null;
  clueGiverId: string | null;
  error: GameStateError | null;
  scores: TeamScores;
  roundId: number | null;
  roundEndsAt: number | null;
  passesUsed: number;
}

export interface PersonalGameView {
  roundId: number | null;
  cardVersion: number | null;
  currentCard: TabuCard | null;
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
  game: PublicGameState;
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
  | "game-already-started"
  | "already-in-room"
  | "server-unavailable"
  | "request-timeout";

export type RoomActionResponse =
  | { ok: true; room: RoomState }
  | { ok: false; error: RoomErrorCode };

export type TeamActionError =
  | "invalid-team"
  | "not-in-room"
  | "game-already-started"
  | "server-unavailable"
  | "request-timeout";

export type TeamActionResponse =
  | { ok: true }
  | { ok: false; error: TeamActionError };

export type CaptainActionError =
  | "invalid-team"
  | "invalid-captain"
  | "not-in-room"
  | "not-host"
  | "game-already-started"
  | "server-unavailable"
  | "request-timeout";

export type CaptainActionResponse =
  | { ok: true }
  | { ok: false; error: CaptainActionError };

export type SettingsActionError =
  | "invalid-settings"
  | "not-in-room"
  | "not-host"
  | "game-already-started"
  | "server-unavailable"
  | "request-timeout";

export type SettingsActionResponse =
  | { ok: true }
  | { ok: false; error: SettingsActionError };

export type GameStartError =
  | "not-in-room"
  | "not-host"
  | "game-already-started"
  | "not-enough-players"
  | "teams-incomplete"
  | "captains-required"
  | "players-unassigned"
  | "server-unavailable"
  | "request-timeout";

export type GameStartResponse = { ok: true } | { ok: false; error: GameStartError };

export type RoundStartError =
  | "not-in-room"
  | "round-not-ready"
  | "not-clue-giver"
  | "team-unavailable"
  | "server-unavailable"
  | "request-timeout";

export type RoundStartResponse = { ok: true } | { ok: false; error: RoundStartError };

export interface CardActionPayload {
  action: CardAction;
  cardVersion: number;
}

export type CardActionError =
  | "not-in-room"
  | "round-not-active"
  | "invalid-action"
  | "not-authorized"
  | "pass-limit-reached"
  | "stale-card"
  | "server-unavailable"
  | "request-timeout";

export type CardActionResponse = { ok: true } | { ok: false; error: CardActionError };

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
  "game:start": (acknowledge: (response: GameStartResponse) => void) => void;
  "game:start-round": (acknowledge: (response: RoundStartResponse) => void) => void;
  "game:card-action": (
    payload: CardActionPayload,
    acknowledge: (response: CardActionResponse) => void
  ) => void;
}

export interface ServerToClientEvents {
  "room:state": (room: RoomState) => void;
  "game:view": (view: PersonalGameView) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  roomCode?: string;
}
