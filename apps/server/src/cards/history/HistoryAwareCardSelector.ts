import type { TabuCard } from "@tabu/shared";
import type { RandomIndex } from "../Deck.js";
import type { CardHistoryStore } from "./CardHistoryStore.js";

export const HISTORY_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Buckets are strict and ordered: unseen, >60 days, >30 through 60,
 * >7 through 30, then 0 through 7 days. Future timestamps are recent.
 */
export function historyPriority(lastSeenAt: number | undefined, now: number): number {
  if (lastSeenAt === undefined) return 0;
  const age = Math.max(0, now - lastSeenAt);
  if (age > 60 * HISTORY_DAY_MS) return 1;
  if (age > 30 * HISTORY_DAY_MS) return 2;
  if (age > 7 * HISTORY_DAY_MS) return 3;
  return 4;
}

export class HistoryAwareCardSelector {
  constructor(
    private readonly history: CardHistoryStore,
    private readonly profileId: string,
    private readonly now: () => number,
    private readonly chooseIndex: RandomIndex
  ) {}

  select(candidates: readonly TabuCard[]): TabuCard {
    if (candidates.length === 0) throw new Error("History selector requires at least one candidate.");
    const now = this.now();
    const buckets: TabuCard[][] = [[], [], [], [], []];
    for (const card of candidates) {
      const entry = this.history.get(this.profileId, card.id);
      buckets[historyPriority(entry?.lastSeenAt, now)]!.push(card);
    }
    const preferred = buckets.find((bucket) => bucket.length > 0)!;
    const index = this.chooseIndex(preferred.length);
    if (!Number.isInteger(index) || index < 0 || index >= preferred.length) {
      throw new Error(`Random index ${index} is invalid for a history bucket of ${preferred.length} cards.`);
    }
    return preferred[index]!;
  }
}
