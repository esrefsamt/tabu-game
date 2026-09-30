import { randomInt } from "node:crypto";
import type { TabuCard } from "@tabu/shared";
import { TABU_CARDS } from "./cards.js";
import { validateCards } from "./validateCards.js";

export type RandomIndex = (maxExclusive: number) => number;
export type CardSelector = (candidates: readonly TabuCard[]) => TabuCard;

export class Deck {
  private usedCardIds = new Set<string>();
  private previousCardId: string | null = null;
  private eligibleCards: readonly TabuCard[];

  constructor(
    private readonly cards: readonly TabuCard[] = TABU_CARDS,
    private readonly chooseIndex: RandomIndex = (maxExclusive) => randomInt(maxExclusive)
  ) {
    validateCards(cards);
    this.eligibleCards = cards;
  }

  setEligibleCards(cards: readonly TabuCard[]): void {
    if (cards.length === 0 || cards.some((card) => !this.cards.includes(card))) {
      throw new Error("Eligible cards must be a nonempty subset of this deck.");
    }
    this.eligibleCards = cards;
  }

  draw(selectCard?: CardSelector): TabuCard {
    let candidates = this.eligibleCards.filter((card) => !this.usedCardIds.has(card.id));
    if (candidates.length === 0) {
      for (const card of this.eligibleCards) this.usedCardIds.delete(card.id);
      candidates = [...this.eligibleCards];
    }
    if (candidates.length > 1 && this.previousCardId) {
      candidates = candidates.filter((card) => card.id !== this.previousCardId);
    }
    const card = selectCard ? selectCard(candidates) : this.chooseRandom(candidates);
    if (!candidates.includes(card)) throw new Error("Card selector returned an ineligible card.");
    this.usedCardIds.add(card.id);
    this.previousCardId = card.id;
    return card;
  }

  get usedCount(): number {
    return this.usedCardIds.size;
  }

  private chooseRandom(cards: readonly TabuCard[]): TabuCard {
    const index = this.chooseIndex(cards.length);
    if (!Number.isInteger(index) || index < 0 || index >= cards.length) {
      throw new Error(`Random index ${index} is invalid for a deck of ${cards.length} cards.`);
    }
    return cards[index]!;
  }
}
