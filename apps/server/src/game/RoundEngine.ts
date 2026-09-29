import type { CardAction, TabuCard, Team, TeamScores } from "@tabu/shared";

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
  | { ok: true; consumedWord: string; reachedTarget: boolean }
  | { ok: false; error: "round-not-active" | "stale-card" | "pass-limit-reached" };

export class RoundEngine {
  private readonly scores: TeamScores = { A: 0, B: 0 };
  private currentCardValue: TabuCard | null = null;
  private cardVersionValue: number;
  private roundSequence = 0;
  private roundIdValue: number | null = null;
  private roundStartedAtValue: number | null = null;
  private roundEndsAtValue: number | null = null;
  private passesUsedValue = 0;
  private timer: TimerHandle | null = null;

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
    passesUsed: number;
  } {
    return {
      scores: { ...this.scores },
      roundId: this.roundIdValue,
      roundEndsAt: this.roundEndsAtValue,
      passesUsed: this.passesUsedValue
    };
  }

  start(durationSeconds: number): void {
    if (this.isActive) {
      throw new Error("A round is already active.");
    }
    if (!Number.isInteger(durationSeconds) || durationSeconds <= 0) {
      throw new Error("Round duration must be a positive number of seconds.");
    }

    this.currentCardValue = this.drawNextCard();
    this.cardVersionValue += 1;
    this.roundSequence += 1;
    this.roundIdValue = this.roundSequence;
    this.passesUsedValue = 0;
    this.roundStartedAtValue = this.clock.now();
    this.roundEndsAtValue = this.roundStartedAtValue + durationSeconds * 1000;
    this.timer = this.clock.setTimeout(() => this.finish(), durationSeconds * 1000);
  }

  applyAction(
    action: CardAction,
    cardVersion: number,
    activeTeam: Team,
    passLimit: number,
    targetScore: number
  ): RoundActionResult {
    if (!this.isActive || !this.currentCardValue) {
      return { ok: false, error: "round-not-active" };
    }
    if (this.expireIfDue()) {
      return { ok: false, error: "round-not-active" };
    }
    if (cardVersion !== this.cardVersionValue) {
      return { ok: false, error: "stale-card" };
    }
    if (action === "pass" && this.passesUsedValue >= passLimit) {
      return { ok: false, error: "pass-limit-reached" };
    }

    const consumedWord = this.currentCardValue.word;

    if (action === "correct") {
      this.scores[activeTeam] += 1;
    } else if (action === "pass") {
      this.passesUsedValue += 1;
    } else {
      this.scores[activeTeam] -= 1;
    }

    if (this.scores[activeTeam] >= targetScore) {
      this.clearCurrentRound();
      return { ok: true, consumedWord, reachedTarget: true };
    }

    this.currentCardValue = this.drawNextCard();
    this.cardVersionValue += 1;
    return { ok: true, consumedWord, reachedTarget: false };
  }

  expireIfDue(): boolean {
    if (this.isActive && this.roundEndsAtValue !== null && this.clock.now() >= this.roundEndsAtValue) {
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

  private clearCurrentRound(): void {
    if (this.timer !== null) {
      this.clock.clearTimeout(this.timer);
      this.timer = null;
    }
    this.currentCardValue = null;
    this.roundIdValue = null;
    this.roundStartedAtValue = null;
    this.roundEndsAtValue = null;
    this.passesUsedValue = 0;
  }
}
