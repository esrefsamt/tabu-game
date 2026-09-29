import assert from "node:assert/strict";
import test from "node:test";
import type { TabuCard } from "@tabu/shared";
import { FakeRoundClock } from "./FakeRoundClock.test-helper.js";
import { RoundEngine } from "./RoundEngine.js";

const cards = [
  { id: "a", word: "Elma", forbiddenWords: ["Meyve", "Kırmızı", "Dal", "Çekirdek", "Ağaç"] },
  { id: "b", word: "Tren", forbiddenWords: ["Ray", "Vagon", "Bilet", "İstasyon", "Yolcu"] },
  { id: "c", word: "Deniz", forbiddenWords: ["Su", "Dalga", "Sahil", "Yüzmek", "Mavi"] }
] as const satisfies readonly TabuCard[];

function roundFixture() {
  const clock = new FakeRoundClock();
  let drawIndex = 0;
  let expired = 0;
  const round = new RoundEngine(
    () => cards[drawIndex++ % cards.length]!,
    () => { expired += 1; },
    clock
  );
  return { round, clock, expiredCount: () => expired, drawCount: () => drawIndex };
}

test("starting a round draws a card and records an authoritative end time", () => {
  const { round, clock } = roundFixture();
  round.start(30);
  assert.equal(round.currentCard?.id, "a");
  assert.equal(round.cardVersion, 1);
  assert.equal(round.publicState.roundEndsAt, clock.now() + 30_000);
  assert.equal(clock.activeTimerCount, 1);
  round.dispose();
});

test("Correct scores once, replaces the card, and rejects a double or stale action", () => {
  const { round } = roundFixture();
  round.start(30);
  const firstVersion = round.cardVersion!;
  assert.deepEqual(round.applyAction("correct", firstVersion, "A", 3, 30), { ok: true, consumedWord: "Elma", reachedTarget: false });
  assert.equal(round.publicState.scores.A, 1);
  assert.equal(round.currentCard?.id, "b");
  assert.deepEqual(round.applyAction("correct", firstVersion, "A", 3, 30), { ok: false, error: "stale-card" });
  assert.deepEqual(round.applyAction("tabu", firstVersion, "A", 3, 30), { ok: false, error: "stale-card" });
  assert.equal(round.publicState.scores.A, 1);
  round.dispose();
});

test("Pass changes the card and pass count without changing score", () => {
  const { round } = roundFixture();
  round.start(30);
  assert.deepEqual(round.applyAction("pass", round.cardVersion!, "A", 1, 30), { ok: true, consumedWord: "Elma", reachedTarget: false });
  assert.equal(round.publicState.passesUsed, 1);
  assert.deepEqual(round.publicState.scores, { A: 0, B: 0 });
  assert.equal(round.currentCard?.id, "b");
  assert.deepEqual(round.applyAction("pass", round.cardVersion!, "A", 1, 30), { ok: false, error: "pass-limit-reached" });
  assert.equal(round.currentCard?.id, "b");
  round.dispose();
});

test("a zero pass limit rejects Pass without consuming the card", () => {
  const { round } = roundFixture();
  round.start(30);
  assert.deepEqual(round.applyAction("pass", round.cardVersion!, "A", 0, 30), { ok: false, error: "pass-limit-reached" });
  assert.equal(round.currentCard?.id, "a");
  round.dispose();
});

test("Tabu subtracts a point and replaces the card", () => {
  const { round } = roundFixture();
  round.start(30);
  assert.deepEqual(round.applyAction("tabu", round.cardVersion!, "A", 3, 30), { ok: true, consumedWord: "Elma", reachedTarget: false });
  assert.equal(round.publicState.scores.A, -1);
  assert.equal(round.currentCard?.id, "b");
  round.dispose();
});

test("timer expiration happens once, clears the card, and leaves the next round stopped", () => {
  const { round, clock, expiredCount, drawCount } = roundFixture();
  round.start(30);
  clock.advance(30_000);
  assert.equal(expiredCount(), 1);
  assert.equal(round.isActive, false);
  assert.equal(round.currentCard, null);
  assert.equal(drawCount(), 1);
  assert.equal(round.publicState.roundEndsAt, null);
  assert.equal(clock.activeTimerCount, 0);
  clock.advance(30_000);
  assert.equal(expiredCount(), 1);
  assert.deepEqual(round.applyAction("correct", 1, "A", 3, 30), { ok: false, error: "round-not-active" });
});

test("an action at the deadline expires the round before it can score", () => {
  const { round, clock, expiredCount } = roundFixture();
  round.start(30);
  clock.elapseWithoutRunning(30_000);
  assert.deepEqual(round.applyAction("correct", 1, "A", 3, 30), { ok: false, error: "round-not-active" });
  assert.equal(round.publicState.scores.A, 0);
  assert.equal(expiredCount(), 1);
  assert.equal(clock.activeTimerCount, 0);
});

test("scores persist and the pass count resets between rounds", () => {
  const { round, clock } = roundFixture();
  round.start(30);
  round.applyAction("correct", round.cardVersion!, "A", 3, 30);
  round.applyAction("pass", round.cardVersion!, "A", 3, 30);
  assert.equal(round.publicState.passesUsed, 1);
  clock.advance(30_000);
  assert.equal(round.publicState.passesUsed, 0);
  round.start(30);
  assert.equal(round.publicState.scores.A, 1);
  assert.equal(round.publicState.passesUsed, 0);
  assert.equal(round.publicState.roundId, 2);
  round.dispose();
});

test("disposing an active round clears its timer and card", () => {
  const { round, clock, expiredCount } = roundFixture();
  round.start(30);
  round.dispose();
  clock.advance(30_000);
  assert.equal(clock.activeTimerCount, 0);
  assert.equal(expiredCount(), 0);
  assert.equal(round.currentCard, null);
});

test("a winning Correct clears the card and timer without drawing a replacement", () => {
  const { round, clock, expiredCount, drawCount } = roundFixture();
  round.start(30);
  assert.deepEqual(round.applyAction("correct", round.cardVersion!, "A", 3, 1), {
    ok: true, consumedWord: "Elma", reachedTarget: true
  });
  assert.equal(round.publicState.scores.A, 1);
  assert.equal(round.currentCard, null);
  assert.equal(drawCount(), 1);
  assert.equal(round.cardVersion, null);
  assert.equal(round.publicState.roundId, null);
  assert.equal(round.publicState.roundEndsAt, null);
  assert.equal(clock.activeTimerCount, 0);
  assert.deepEqual(round.applyAction("correct", 1, "A", 3, 1), { ok: false, error: "round-not-active" });
  clock.advance(30_000);
  assert.equal(expiredCount(), 0);
  round.dispose();
});
