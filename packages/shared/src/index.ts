export interface HealthResponse {
  status: "ok";
}

export type Team = "A" | "B";
export type RoundDurationSeconds = 30 | 45 | 60 | 90 | 120;
export type PassLimit = 0 | 1 | 2 | 3 | 4 | 5 | 10;
export type TargetScore = 10 | 15 | 20 | 25 | 30 | 40 | 50;
export const PLAYER_CATEGORY_IDS = ["DAILY", "FOOD", "SPORTS", "TECH", "WORK_EDUCATION", "SCIENCE_HEALTH", "NATURE", "TRAVEL", "HOME_OBJECTS", "CULTURE_ART"] as const;
export type PlayerCategoryId = typeof PLAYER_CATEGORY_IDS[number];
export type CardSelection = { mode: "GENERAL" } | { mode: "CUSTOM"; categories: PlayerCategoryId[] };

export interface TabuCard {
  readonly id: string;
  readonly word: string;
  readonly forbiddenWords: readonly [string, string, string, string, string];
}

export interface RoomSettings {
  roundDurationSeconds: RoundDurationSeconds;
  passLimit: PassLimit;
  targetScore: TargetScore;
  cardSelection: CardSelection;
}

export type GamePhase = "lobby" | "turn-preparation" | "round-active" | "unable-to-continue" | "game-over";
export type GameStateError = "team-empty";
export type CardAction = "correct" | "pass" | "tabu";
export type PowerUp = "double-score" | "attack-score";
export type PowerUpInventory = Record<PowerUp, boolean>;

export interface CardResult {
  action: CardAction;
  word: string;
  scoreEffect?: string;
}

export interface TeamScores {
  A: number;
  B: number;
}

export interface PublicGameState {
  phase: GamePhase;
  winnerTeam: Team | null;
  activeTeam: Team | null;
  clueGiverId: string | null;
  error: GameStateError | null;
  scores: TeamScores;
  completedRounds: TeamScores;
  isOvertime: boolean;
  roundId: number | null;
  roundEndsAt: number | null;
  roundPausedRemainingMs: number | null;
  passesUsed: number;
  tabuCooldownUntil: number | null;
  powerUps: Record<Team, PowerUpInventory>;
  selectedPowerUp: PowerUp | null;
  activePowerUp: PowerUp | null;
}

export type MatchEventType = "round-start" | "correct" | "pass" | "tabu" | "round-paused" | "round-resumed" | "match-win";

export interface MatchEvent {
  id: number;
  type: MatchEventType;
  text: string;
  occurredAt: number;
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
  isConnected: boolean;
  team: Team | null;
  roomWins: number;
}

export interface RoomState {
  code: string;
  players: Player[];
  captainAId: string | null;
  captainBId: string | null;
  settings: RoomSettings;
  game: PublicGameState;
  recentEvents: MatchEvent[];
}

export interface CreateRoomPayload {
  name: string;
  historyProfileId: string;
}

export interface JoinRoomPayload {
  name: string;
  roomCode: string;
}

export interface ResumeRoomPayload {
  roomCode: string;
  sessionToken: string;
}

export interface MovePlayerPayload {
  playerId: string;
  team: Team | null;
}

export interface KickPlayerPayload {
  playerId: string;
}

export type KickPlayerError = "not-in-room" | "not-host" | "game-already-started" |
  "invalid-player" | "cannot-kick-self" | "server-unavailable" | "request-timeout";
export type KickPlayerResponse = { ok: true } | { ok: false; error: KickPlayerError };

export interface SetCaptainPayload {
  team: Team;
  captainId: string | null;
}

export type UpdateRoomSettingsPayload =
  | { setting: "roundDurationSeconds"; value: RoundDurationSeconds }
  | { setting: "passLimit"; value: PassLimit }
  | { setting: "targetScore"; value: TargetScore }
  | { setting: "cardSelection"; value: CardSelection };

export type RoomErrorCode =
  | "invalid-name"
  | "invalid-history-profile"
  | "invalid-room-code"
  | "room-not-found"
  | "room-full"
  | "game-already-started"
  | "already-in-room"
  | "server-unavailable"
  | "request-timeout";

export type RoomActionResponse =
  | { ok: true; room: RoomState; playerId: string; sessionToken: string }
  | { ok: false; error: RoomErrorCode };

export type ResumeRoomResponse =
  | { ok: true; room: RoomState; playerId: string }
  | { ok: false; error: "invalid-session" | "room-not-found" | "already-in-room" };

export type MovePlayerError =
  | "invalid-team"
  | "invalid-player"
  | "not-in-room"
  | "not-host"
  | "game-already-started"
  | "server-unavailable"
  | "request-timeout";

export type MovePlayerResponse =
  | { ok: true }
  | { ok: false; error: MovePlayerError };

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

export type ReturnToLobbyError =
  | "not-in-room"
  | "not-host"
  | "game-not-over"
  | "server-unavailable"
  | "request-timeout";

export type ReturnToLobbyResponse = { ok: true } | { ok: false; error: ReturnToLobbyError };

export type RoundStartError =
  | "not-in-room"
  | "round-not-ready"
  | "not-clue-giver"
  | "team-unavailable"
  | "server-unavailable"
  | "request-timeout";

export type RoundStartResponse = { ok: true } | { ok: false; error: RoundStartError };

export interface SelectPowerUpPayload { powerUp: PowerUp | null }
export type SelectPowerUpError = "not-in-room" | "round-not-ready" | "not-clue-giver" |
  "invalid-power-up" | "power-up-unavailable" | "server-unavailable" | "request-timeout";
export type SelectPowerUpResponse = { ok: true } | { ok: false; error: SelectPowerUpError };

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
  | "tabu-cooldown"
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
  "room:resume": (
    payload: ResumeRoomPayload,
    acknowledge: (response: ResumeRoomResponse) => void
  ) => void;
  "room:leave": (acknowledge: (response: { ok: true } | { ok: false; error: "not-in-room" }) => void) => void;
  "room:move-player": (
    payload: MovePlayerPayload,
    acknowledge: (response: MovePlayerResponse) => void
  ) => void;
  "room:kick-player": (
    payload: KickPlayerPayload,
    acknowledge: (response: KickPlayerResponse) => void
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
  "game:return-to-lobby": (acknowledge: (response: ReturnToLobbyResponse) => void) => void;
  "game:start-round": (acknowledge: (response: RoundStartResponse) => void) => void;
  "game:select-power-up": (payload: SelectPowerUpPayload, acknowledge: (response: SelectPowerUpResponse) => void) => void;
  "game:card-action": (
    payload: CardActionPayload,
    acknowledge: (response: CardActionResponse) => void
  ) => void;
}

export interface ServerToClientEvents {
  "room:state": (room: RoomState) => void;
  "room:session-moved": () => void;
  "room:kicked": (payload: { roomCode: string }) => void;
  "game:view": (view: PersonalGameView) => void;
  "game:card-result": (result: CardResult) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  roomCode?: string;
  playerId?: string;
}
