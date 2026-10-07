import type { CardAction, PowerUp, RoundPauseCause, RoundPauseCauses, TabuCard, Team, TeamScores } from "@tabu/shared";

type TimerHandle = ReturnType<typeof setTimeout>;

export interface RoundClock {
  now(): number;
  setTimeout(callback: () => void, delayMs: number): TimerHandle;
  clearTimeout(handle: TimerHandle): void;
}

export const systemRoundClock: RoundClock = {
  now: () => Date.now(),
  setTimeout: (callback, delayMs) => setTimeout(callback, delayMs),
  clearTimeout: (handle) => clearTimeout(handle)
};

export type RoundActionResult =
  | { ok: true; consumedWord: string }
  | { ok: false; error: "round-not-active" | "stale-card" | "pass-limit-reached" | "tabu-cooldown" };

const TABU_COOLDOWN_MS = 1200;

export class RoundEngine {
  private readonly scores: TeamScores = { A: 0, B: 0 };
  private currentCardValue: TabuCard | null = null;
  private cardVersionValue: number;
  private roundSequence = 0;
  private roundIdValue: number | null = null;
  private roundStartedAtValue: number | null = null;
  private roundEndsAtValue: number | null = null;
  private pausedRemainingMs: number | null = null;
  private readonly pauseCauses = new Set<RoundPauseCause>();
  private passesUsedValue = 0;
  private tabuCooldownUntilValue: number | null = null;
  private timer: TimerHandle | null = null;
  private timerGeneration = 0;
  private activePowerUpValue: PowerUp | null = null;

  constructor(
    private readonly drawNextCard: () => TabuCard,
    private readonly onExpired: () => void,
    private readonly clock: RoundClock = systemRoundClock,
    initialCardVersion = 0
  ) {
    this.cardVersionValue = initialCardVersion;
  }

  get isActive(): boolean {
    return this.roundIdValue !== null;
  }

  get isPaused(): boolean {
    return this.pauseCauses.size > 0;
  }

  hasPauseCause(cause: RoundPauseCause): boolean { return this.pauseCauses.has(cause); }

  get activePowerUp(): PowerUp | null { return this.activePowerUpValue; }

  get currentCard(): TabuCard | null {
    return this.currentCardValue;
  }

  get cardVersion(): number | null {
    return this.isActive ? this.cardVersionValue : null;
  }

  get lastCardVersion(): number {
    return this.cardVersionValue;
  }

  get publicState(): {
    scores: TeamScores;
    roundId: number | null;
    roundEndsAt: number | null;
    roundPausedRemainingMs: number | null;
    pauseCauses: RoundPauseCauses;
    passesUsed: number;
    tabuCooldownUntil: number | null;
  } {
    return {
      scores: { ...this.scores },
      roundId: this.roundIdValue,
      roundEndsAt: this.roundEndsAtValue,
      roundPausedRemainingMs: this.pausedRemainingMs,
      pauseCauses: { captain: this.pauseCauses.has("captain"), "clue-giver-reconnect": this.pauseCauses.has("clue-giver-reconnect") },
      passesUsed: this.passesUsedValue,
      tabuCooldownUntil: this.tabuCooldownUntilValue
    };
  }

  start(durationSeconds: number, powerUp: PowerUp | null = null): void {
    if (this.isActive) {
      throw new Error("A round is already active.");
    }
    if (!Number.isInteger(durationSeconds) || durationSeconds <= 0) {
      throw new Error("Round duration must be a positive number of seconds.");
    }

    this.currentCardValue = this.drawNextCard();
    this.activePowerUpValue = powerUp;
    this.cardVersionValue += 1;
    this.roundSequence += 1;
    this.roundIdValue = this.roundSequence;
    this.passesUsedValue = 0;
    this.roundStartedAtValue = this.clock.now();
    this.roundEndsAtValue = this.roundStartedAtValue + durationSeconds * 1000;
    this.scheduleExpiration(durationSeconds * 1000);
  }

  pause(cause: RoundPauseCause = "clue-giver-reconnect"): boolean {
    if (!this.isActive || this.pauseCauses.has(cause)) return false;
    if (!this.isPaused) {
      if (this.expireIfDue()) return false;
      const remainingMs = Math.max(0, this.roundEndsAtValue! - this.clock.now());
      if (remainingMs <= 0) {
        this.finish();
        return false;
      }
      this.clearTimer();
      this.pausedRemainingMs = remainingMs;
      this.roundEndsAtValue = null;
    }
    this.pauseCauses.add(cause);
    return true;
  }

  resume(cause: RoundPauseCause = "clue-giver-reconnect"): boolean {
    if (!this.isActive || !this.pauseCauses.delete(cause)) return false;
    if (this.isPaused) return true;
    if (this.pausedRemainingMs === null) throw new Error("Paused round has no remaining time.");
    const remainingMs = this.pausedRemainingMs;
    this.pausedRemainingMs = null;
    this.roundEndsAtValue = this.clock.now() + remainingMs;
    this.scheduleExpiration(remainingMs);
    return true;
  }

  applyAction(
    action: CardAction,
    cardVersion: number,
    activeTeam: Team,
    passLimit: number
  ): RoundActionResult {
    if (!this.isActive || this.isPaused || !this.currentCardValue) {
      return { ok: false, error: "round-not-active" };
    }
    if (this.expireIfDue()) {
      return { ok: false, error: "round-not-active" };
    }
    if (cardVersion !== this.cardVersionValue) {
      return { ok: false, error: "stale-card" };
    }
    if (action === "tabu" && this.tabuCooldownUntilValue !== null && this.clock.now() < this.tabuCooldownUntilValue) {
      return { ok: false, error: "tabu-cooldown" };
    }
    if (action === "pass" && this.passesUsedValue >= passLimit) {
      return { ok: false, error: "pass-limit-reached" };
    }

    const consumedWord = this.currentCardValue.word;

    const opposingTeam: Team = activeTeam === "A" ? "B" : "A";
    if (action === "correct") {
      if (this.activePowerUpValue === "attack-score") this.scores[opposingTeam] -= 1;
      else this.scores[activeTeam] += this.activePowerUpValue === "double-score" ? 2 : 1;
    } else if (action === "pass") {
      this.passesUsedValue += 1;
    } else {
      if (this.activePowerUpValue === "attack-score") this.scores[opposingTeam] += 1;
      else this.scores[activeTeam] -= this.activePowerUpValue === "double-score" ? 2 : 1;
      this.tabuCooldownUntilValue = this.clock.now() + TABU_COOLDOWN_MS;
    }

    this.currentCardValue = this.drawNextCard();
    this.cardVersionValue += 1;
    return { ok: true, consumedWord };
  }

  expireIfDue(): boolean {
    if (this.isActive && !this.isPaused && this.roundEndsAtValue !== null && this.clock.now() >= this.roundEndsAtValue) {
      this.finish();
      return true;
    }
    return false;
  }

  abort(): void {
    this.clearCurrentRound();
  }

  dispose(): void {
    this.clearCurrentRound();
  }

  private finish(): void {
    if (!this.isActive) {
      return;
    }
    this.clearCurrentRound();
    this.onExpired();
  }

  private scheduleExpiration(delayMs: number): void {
    const generation = ++this.timerGeneration;
    this.timer = this.clock.setTimeout(() => {
      if (this.timerGeneration === generation && !this.isPaused) this.finish();
    }, delayMs);
  }

  private clearTimer(): void {
    this.timerGeneration += 1;
    if (this.timer !== null) {
      this.clock.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private clearCurrentRound(): void {
    this.clearTimer();
    this.currentCardValue = null;
    this.roundIdValue = null;
    this.roundStartedAtValue = null;
    this.roundEndsAtValue = null;
    this.pausedRemainingMs = null;
    this.pauseCauses.clear();
    this.passesUsedValue = 0;
    this.activePowerUpValue = null;
  }
}
