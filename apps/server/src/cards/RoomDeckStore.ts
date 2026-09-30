import { randomInt } from "node:crypto";
import type { TabuCard } from "@tabu/shared";
import { TABU_CARDS } from "./cards.js";
import { Deck, type RandomIndex } from "./Deck.js";
import { HistoryAwareCardSelector } from "./history/HistoryAwareCardSelector.js";
import { InMemoryCardHistoryStore, type CardHistoryStore } from "./history/CardHistoryStore.js";

interface RoomDeck {
  deck: Deck;
  historyProfileId: string;
}

export class RoomDeckStore {
  private readonly decks = new Map<string, RoomDeck>();

  constructor(
    private readonly cards: readonly TabuCard[] = TABU_CARDS,
    private readonly chooseIndex: RandomIndex = (maxExclusive) => randomInt(maxExclusive),
    private readonly history: CardHistoryStore = new InMemoryCardHistoryStore(),
    private readonly now: () => number = () => Date.now()
  ) {}

  create(roomCode: string, historyProfileId = `room:${roomCode}`): void {
    if (this.decks.has(roomCode)) {
      throw new Error(`A deck already exists for room ${roomCode}.`);
    }

    this.decks.set(roomCode, {
      deck: new Deck(this.cards, this.chooseIndex),
      historyProfileId
    });
  }

  draw(roomCode: string): TabuCard {
    const roomDeck = this.decks.get(roomCode);
    if (!roomDeck) {
      throw new Error(`No deck exists for room ${roomCode}.`);
    }
    const selector = new HistoryAwareCardSelector(
      this.history, roomDeck.historyProfileId, this.now, this.chooseIndex
    );
    const card = roomDeck.deck.draw((candidates) => selector.select(candidates));
    this.history.recordSeen(roomDeck.historyProfileId, card.id, this.now());
    return card;
  }

  setEligibleCards(roomCode: string, cards: readonly TabuCard[]): void {
    const roomDeck = this.decks.get(roomCode);
    if (!roomDeck) throw new Error(`No deck exists for room ${roomCode}.`);
    roomDeck.deck.setEligibleCards(cards);
  }

  remove(roomCode: string): void {
    this.decks.delete(roomCode);
  }
}
