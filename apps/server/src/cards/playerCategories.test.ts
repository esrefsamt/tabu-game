import assert from "node:assert/strict";
import test from "node:test";
import { PLAYER_CATEGORY_IDS, type TabuCard } from "@tabu/shared";
import { CARD_CATEGORIES } from "./data/index.js";
import { TABU_CARDS } from "./cards.js";
import { Deck } from "./Deck.js";
import { RoomDeckStore } from "./RoomDeckStore.js";
import { PLAYER_CATEGORY_COUNTS, PLAYER_CATEGORY_SOURCES, cardsForSelection, isValidCardSelection } from "./playerCategories.js";

test("ten groups partition all 31 source collections and all 2,977 cards", () => {
  assert.equal(PLAYER_CATEGORY_IDS.length, 10);
  const sources = PLAYER_CATEGORY_IDS.flatMap((id) => PLAYER_CATEGORY_SOURCES[id]);
  assert.equal(new Set(sources).size, sources.length);
  assert.deepEqual(new Set(sources), new Set(Object.keys(CARD_CATEGORIES)));
  assert.equal(TABU_CARDS.length, 2977);
  assert.equal(Object.values(PLAYER_CATEGORY_COUNTS).reduce((a, b) => a + b, 0), 2977);
  assert.deepEqual(new Set(cardsForSelection({ mode: "GENERAL" }).map((card) => card.id)), new Set(TABU_CARDS.map((card) => card.id)));
});

test("custom pools contain only the selected groups without duplicate cards", () => {
  for (const id of PLAYER_CATEGORY_IDS) {
    const cards = cardsForSelection({ mode: "CUSTOM", categories: [id] });
    assert.equal(cards.length, PLAYER_CATEGORY_COUNTS[id]);
    assert.equal(new Set(cards.map((card) => card.id)).size, cards.length);
  }
  const chosen = ["SPORTS", "FOOD"] as const;
  const pool = cardsForSelection({ mode: "CUSTOM", categories: [...chosen] });
  assert.equal(pool.length, PLAYER_CATEGORY_COUNTS.SPORTS + PLAYER_CATEGORY_COUNTS.FOOD);
  assert.deepEqual(new Set(pool.map((card) => card.id)), new Set(chosen.flatMap((id) => cardsForSelection({ mode: "CUSTOM", categories: [id] }).map((card) => card.id))));
});

test("selection validation rejects unknown, empty, duplicate, and malformed values", () => {
  assert.equal(isValidCardSelection({ mode: "GENERAL" }), true);
  assert.equal(isValidCardSelection({ mode: "CUSTOM", categories: ["FOOD", "SPORTS"] }), true);
  for (const value of [
    { mode: "CUSTOM", categories: [] }, { mode: "CUSTOM", categories: ["FOOD", "FOOD"] },
    { mode: "CUSTOM", categories: ["SECRET"] }, { mode: "CUSTOM", categories: "FOOD" },
    { mode: "GENERAL", categories: ["FOOD"] }, { mode: "BAD" }, null, []
  ]) assert.equal(isValidCardSelection(value), false);
});

const samples: readonly TabuCard[] = [
  { id: "a", word: "A", forbiddenWords: ["a1", "a2", "a3", "a4", "a5"] },
  { id: "b", word: "B", forbiddenWords: ["b1", "b2", "b3", "b4", "b5"] },
  { id: "c", word: "C", forbiddenWords: ["c1", "c2", "c3", "c4", "c5"] },
  { id: "d", word: "D", forbiddenWords: ["d1", "d2", "d3", "d4", "d5"] }
];

test("changing eligible pools retains used cards; exhaustion resets only current pool", () => {
  const deck = new Deck(samples, (max) => max - 1);
  deck.setEligibleCards(samples.slice(0, 2));
  assert.equal(deck.draw().id, "a");
  deck.setEligibleCards(samples.slice(2));
  assert.equal(deck.draw().id, "c");
  deck.setEligibleCards(samples.slice(0, 2));
  assert.equal(deck.draw().id, "b");
  assert.equal(deck.usedCount, 3);
  assert.equal(deck.draw().id, "a");
  assert.equal(deck.usedCount, 2);
  deck.setEligibleCards(samples.slice(2));
  assert.equal(deck.draw().id, "d");
  assert.equal(deck.usedCount, 3);
});

test("room decks stay independent through category changes", () => {
  const rooms = new RoomDeckStore(samples, (max) => max - 1);
  rooms.create("A"); rooms.create("B");
  rooms.setEligibleCards("A", samples.slice(0, 2));
  assert.equal(rooms.draw("A").id, "a");
  assert.equal(rooms.draw("B").id, "a");
  rooms.setEligibleCards("A", samples.slice(1, 3));
  assert.equal(rooms.draw("A").id, "b");
  assert.equal(rooms.draw("B").id, "b");
});
