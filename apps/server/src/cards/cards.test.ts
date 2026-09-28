import assert from "node:assert/strict";
import test from "node:test";
import type { TabuCard } from "@tabu/shared";
import { TABU_CARDS } from "./cards.js";
import { Deck } from "./Deck.js";
import { RoomDeckStore } from "./RoomDeckStore.js";
import { validateCards } from "./validateCards.js";

const sampleCards = [
  { id: "a", word: "Elma", forbiddenWords: ["Meyve", "Kırmızı", "Ağaç", "Yemek", "Çekirdek"] },
  { id: "b", word: "Kitap", forbiddenWords: ["Sayfa", "Okumak", "Yazar", "Kapak", "Kütüphane"] },
  { id: "c", word: "Bisiklet", forbiddenWords: ["Pedal", "Zil", "Kask", "Tekerlek", "Sürmek"] }
] as const satisfies readonly TabuCard[];

test("built-in card data has unique IDs and valid words", () => {
  validateCards(TABU_CARDS);
  assert.equal(TABU_CARDS.length, 50);
  assert.equal(new Set(TABU_CARDS.map((card) => card.id)).size, TABU_CARDS.length);
  assert.ok(TABU_CARDS.every((card) => card.word.trim().length > 0));
  assert.ok(TABU_CARDS.every((card) => card.forbiddenWords.length === 5));
});

test("card validation rejects malformed words, forbidden lists, and duplicate values", () => {
  assert.throws(() => validateCards(null), /non-empty array/);
  assert.throws(() => validateCards([
    { id: "x", word: " ", forbiddenWords: ["a", "b", "c", "d", "e"] }
  ]), /non-empty main word/);
  assert.throws(() => validateCards([
    { id: "x", word: "Kelime", forbiddenWords: ["a", "b", "c", "d"] }
  ]), /exactly 5/);
  assert.throws(() => validateCards([
    { id: "x", word: "Kelime", forbiddenWords: ["a", "b", "c", "d", " "] }
  ]), /non-empty forbidden words/);
  assert.throws(() => validateCards([
    { id: "x", word: "Kelime", forbiddenWords: ["a", "b", "c", "d", "A"] }
  ]), /duplicate forbidden word/);
  assert.throws(() => validateCards([
    { id: "x", word: "Bir", forbiddenWords: ["a", "b", "c", "d", "e"] },
    { id: "x", word: "İki", forbiddenWords: ["f", "g", "h", "i", "j"] }
  ]), /Duplicate Tabu card ID/);
  assert.throws(() => validateCards([
    { id: " ", word: "Kelime", forbiddenWords: ["a", "b", "c", "d", "e"] }
  ]), /non-empty ID/);
});

test("a deck draws every card once before starting another cycle", () => {
  const deck = new Deck(sampleCards, (maxExclusive) => maxExclusive - 1);
  const firstCycle = Array.from({ length: sampleCards.length }, () => deck.draw());
  assert.equal(new Set(firstCycle.map((card) => card.id)).size, sampleCards.length);
  assert.equal(deck.usedCount, sampleCards.length);

  const nextCard = deck.draw();
  assert.ok(sampleCards.some((card) => card.id === nextCard.id));
  assert.equal(deck.usedCount, 1);
});

test("a reshuffled cycle avoids repeating its previous final card when possible", () => {
  let calls = 0;
  const deck = new Deck(sampleCards, (maxExclusive) => {
    calls += 1;
    return calls <= 2 ? 0 : maxExclusive - 1;
  });
  const firstCycle = Array.from({ length: sampleCards.length }, () => deck.draw());
  const previousFinalId = firstCycle.at(-1)?.id;
  const nextCard = deck.draw();
  assert.notEqual(nextCard.id, previousFinalId);
});

test("separate deck instances keep independent draw progress", () => {
  const first = new Deck(sampleCards, (maxExclusive) => maxExclusive - 1);
  const second = new Deck(sampleCards, (maxExclusive) => 0);

  first.draw();
  assert.equal(first.usedCount, 1);
  assert.equal(second.usedCount, 0);
  assert.equal(new Set(Array.from({ length: sampleCards.length }, () => second.draw()).map((card) => card.id)).size, 3);
});

test("room decks keep independent progress and are removed with their room", () => {
  const rooms = new RoomDeckStore(sampleCards, (maxExclusive) => maxExclusive - 1);
  rooms.create("ROOM_A");
  rooms.create("ROOM_B");

  const roomAFirstCard = rooms.draw("ROOM_A");
  assert.equal(rooms.draw("ROOM_B").id, roomAFirstCard.id);

  rooms.draw("ROOM_A");
  rooms.draw("ROOM_A");
  rooms.remove("ROOM_A");
  assert.throws(() => rooms.draw("ROOM_A"), /No deck exists/);
  assert.notEqual(rooms.draw("ROOM_B").id, roomAFirstCard.id);
});
