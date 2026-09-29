import { randomInt } from "node:crypto";
import type { TabuCard } from "@tabu/shared";
import { TABU_CARDS } from "./cards.js";
import { validateCards } from "./validateCards.js";

export type RandomIndex = (maxExclusive: number) => number;

export class Deck {
  private shuffledCards: TabuCard[] = [];
  private position = 0;
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
    this.shuffledCards = [];
    this.position = 0;
  }

  draw(): TabuCard {
    if (this.position >= this.shuffledCards.length) {
      this.startNewCycle();
    }

    const card = this.shuffledCards[this.position];
    if (!card) {
      throw new Error("Deck could not draw a card from its shuffled cycle.");
    }

    this.position += 1;
    this.usedCardIds.add(card.id);
    this.previousCardId = card.id;
    return card;
  }

  get usedCount(): number {
    return this.usedCardIds.size;
  }

  private startNewCycle(): void {
    let cards = this.eligibleCards.filter((card) => !this.usedCardIds.has(card.id));
    if (cards.length === 0) {
      for (const card of this.eligibleCards) this.usedCardIds.delete(card.id);
      cards = [...this.eligibleCards];
    }
    for (let index = cards.length - 1; index > 0; index -= 1) {
      const swapIndex = this.chooseIndex(index + 1);
      if (!Number.isInteger(swapIndex) || swapIndex < 0 || swapIndex > index) {
        throw new Error(`Random index ${swapIndex} is invalid for a deck of ${cards.length} cards.`);
      }
      [cards[index], cards[swapIndex]] = [cards[swapIndex]!, cards[index]!];
    }

    if (cards.length > 1 && cards[0]?.id === this.previousCardId) {
      [cards[0], cards[1]] = [cards[1]!, cards[0]!];
    }

    this.shuffledCards = cards;
    this.position = 0;
  }
}
