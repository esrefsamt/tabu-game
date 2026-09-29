import type { TabuCard } from "@tabu/shared";
import { TABU_CARDS } from "./cards.js";
import { Deck, type RandomIndex } from "./Deck.js";

export class RoomDeckStore {
  private readonly decks = new Map<string, Deck>();

  constructor(
    private readonly cards: readonly TabuCard[] = TABU_CARDS,
    private readonly chooseIndex?: RandomIndex
  ) {}

  create(roomCode: string): void {
    if (this.decks.has(roomCode)) {
      throw new Error(`A deck already exists for room ${roomCode}.`);
    }

    const deck = this.chooseIndex
      ? new Deck(this.cards, this.chooseIndex)
      : new Deck(this.cards);
    this.decks.set(roomCode, deck);
  }

  draw(roomCode: string): TabuCard {
    const deck = this.decks.get(roomCode);
    if (!deck) {
      throw new Error(`No deck exists for room ${roomCode}.`);
    }
    return deck.draw();
  }

  setEligibleCards(roomCode: string, cards: readonly TabuCard[]): void {
    const deck = this.decks.get(roomCode);
    if (!deck) throw new Error(`No deck exists for room ${roomCode}.`);
    deck.setEligibleCards(cards);
  }

  remove(roomCode: string): void {
    this.decks.delete(roomCode);
  }
}
