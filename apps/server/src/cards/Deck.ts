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

  constructor(
    private readonly cards: readonly TabuCard[] = TABU_CARDS,
    private readonly chooseIndex: RandomIndex = (maxExclusive) => randomInt(maxExclusive)
  ) {
    validateCards(cards);
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
    const cards = [...this.cards];
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
    this.usedCardIds.clear();
  }
}
