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
  assert.deepEqual(round.applyAction("correct", firstVersion, "A", 3), { ok: true, consumedWord: "Elma" });
  assert.equal(round.publicState.scores.A, 1);
  assert.equal(round.currentCard?.id, "b");
  assert.deepEqual(round.applyAction("correct", firstVersion, "A", 3), { ok: false, error: "stale-card" });
  assert.deepEqual(round.applyAction("tabu", firstVersion, "A", 3), { ok: false, error: "stale-card" });
  assert.equal(round.publicState.scores.A, 1);
  round.dispose();
});

test("Pass changes the card and pass count without changing score", () => {
  const { round } = roundFixture();
  round.start(30);
  assert.deepEqual(round.applyAction("pass", round.cardVersion!, "A", 1), { ok: true, consumedWord: "Elma" });
  assert.equal(round.publicState.passesUsed, 1);
  assert.deepEqual(round.publicState.scores, { A: 0, B: 0 });
  assert.equal(round.currentCard?.id, "b");
  assert.deepEqual(round.applyAction("pass", round.cardVersion!, "A", 1), { ok: false, error: "pass-limit-reached" });
  assert.equal(round.currentCard?.id, "b");
  round.dispose();
});

test("a zero pass limit rejects Pass without consuming the card", () => {
  const { round } = roundFixture();
  round.start(30);
  assert.deepEqual(round.applyAction("pass", round.cardVersion!, "A", 0), { ok: false, error: "pass-limit-reached" });
  assert.equal(round.currentCard?.id, "a");
  round.dispose();
});

test("Tabu subtracts a point and replaces the card", () => {
  const { round } = roundFixture();
  round.start(30);
  assert.deepEqual(round.applyAction("tabu", round.cardVersion!, "A", 3), { ok: true, consumedWord: "Elma" });
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
  assert.deepEqual(round.applyAction("correct", 1, "A", 3), { ok: false, error: "round-not-active" });
});

test("an action at the deadline expires the round before it can score", () => {
  const { round, clock, expiredCount } = roundFixture();
  round.start(30);
  clock.elapseWithoutRunning(30_000);
  assert.deepEqual(round.applyAction("correct", 1, "A", 3), { ok: false, error: "round-not-active" });
  assert.equal(round.publicState.scores.A, 0);
  assert.equal(expiredCount(), 1);
  assert.equal(clock.activeTimerCount, 0);
});

test("pause freezes the authoritative remaining time, card, version, score, and passes", () => {
  const { round, clock, expiredCount, drawCount } = roundFixture();
  round.start(60);
  round.applyAction("correct", round.cardVersion!, "A", 3);
  round.applyAction("pass", round.cardVersion!, "A", 3);
  const card = round.currentCard;
  const version = round.cardVersion;
  const roundId = round.publicState.roundId;
  const draws = drawCount();
  clock.advance(23_000);
  assert.equal(round.pause(), true);
  assert.equal(round.isPaused, true);
  assert.equal(round.publicState.roundPausedRemainingMs, 37_000);
  assert.equal(round.publicState.roundEndsAt, null);
  assert.equal(clock.activeTimerCount, 0);
  assert.equal(round.currentCard, card);
  assert.equal(round.cardVersion, version);
  assert.equal(round.publicState.roundId, roundId);
  assert.deepEqual(round.publicState.scores, { A: 1, B: 0 });
  assert.equal(round.publicState.passesUsed, 1);
  for (const action of ["correct", "pass", "tabu"] as const) {
    assert.deepEqual(round.applyAction(action, version!, "A", 3), { ok: false, error: "round-not-active" });
  }
  clock.advance(3_000);
  assert.equal(expiredCount(), 0);
  assert.equal(round.publicState.roundPausedRemainingMs, 37_000);
  assert.equal(round.resume(), true);
  assert.equal(round.publicState.roundEndsAt, clock.now() + 37_000);
  assert.equal(round.publicState.roundPausedRemainingMs, null);
  assert.equal(clock.activeTimerCount, 1);
  assert.equal(drawCount(), draws);
  assert.equal(round.currentCard, card);
  assert.equal(round.cardVersion, version);
  clock.advance(36_999);
  assert.equal(expiredCount(), 0);
  clock.advance(1);
  assert.equal(expiredCount(), 1);
  assert.equal(clock.activeTimerCount, 0);
  round.dispose();
});

test("a round already due expires instead of pausing", () => {
  const { round, clock, expiredCount } = roundFixture();
  round.start(30);
  clock.elapseWithoutRunning(30_000);
  assert.equal(round.pause(), false);
  assert.equal(round.isActive, false);
  assert.equal(round.isPaused, false);
  assert.equal(expiredCount(), 1);
  assert.equal(clock.activeTimerCount, 0);
});

test("scores persist and the pass count resets between rounds", () => {
  const { round, clock } = roundFixture();
  round.start(30);
  round.applyAction("correct", round.cardVersion!, "A", 3);
  round.applyAction("pass", round.cardVersion!, "A", 3);
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

test("crossing the target keeps the round and scoring active until expiry", () => {
  const { round, clock, expiredCount, drawCount } = roundFixture();
  round.start(30);
  assert.deepEqual(round.applyAction("correct", round.cardVersion!, "A", 3), {
    ok: true, consumedWord: "Elma"
  });
  assert.equal(round.publicState.scores.A, 1);
  assert.equal(round.currentCard?.id, "b");
  assert.equal(drawCount(), 2);
  assert.equal(round.cardVersion, 2);
  assert.equal(round.publicState.roundId, 1);
  assert.equal(clock.activeTimerCount, 1);
  assert.deepEqual(round.applyAction("correct", 1, "A", 3), { ok: false, error: "stale-card" });
  assert.deepEqual(round.applyAction("correct", 2, "A", 3), { ok: true, consumedWord: "Tren" });
  assert.equal(round.publicState.scores.A, 2);
  clock.advance(30_000);
  assert.equal(expiredCount(), 1);
  assert.equal(round.currentCard, null);
  round.dispose();
});

test("a new round engine can continue card versions without accepting a previous match's version", () => {
  const clock = new FakeRoundClock();
  const oldRound = new RoundEngine(() => cards[0]!, () => {}, clock);
  oldRound.start(30);
  const oldVersion = oldRound.cardVersion!;
  oldRound.dispose();
  const newRound = new RoundEngine(() => cards[1]!, () => {}, clock, oldRound.lastCardVersion);
  newRound.start(30);
  assert.ok(newRound.cardVersion! > oldVersion);
  assert.deepEqual(newRound.applyAction("correct", oldVersion, "A", 3), {
    ok: false, error: "stale-card"
  });
  newRound.dispose();
});

test("independent pause causes preserve one timer, card, power-up and exact remaining time", () => {
  const { round, clock, expiredCount } = roundFixture();
  round.start(60, "double-score");
  clock.advance(22_600);
  const card = round.currentCard;
  const version = round.cardVersion;
  assert.equal(round.pause("captain"), true);
  assert.equal(round.publicState.roundPausedRemainingMs, 37_400);
  assert.equal(clock.activeTimerCount, 0);
  assert.equal(round.pause("captain"), false);
  assert.equal(round.pause("clue-giver-reconnect"), true);
  clock.advance(100_000);
  assert.equal(expiredCount(), 0);
  assert.equal(round.currentCard, card);
  assert.equal(round.cardVersion, version);
  assert.equal(round.activePowerUp, "double-score");
  assert.deepEqual(round.publicState.pauseCauses, { captain: true, "clue-giver-reconnect": true });
  assert.equal(round.resume("captain"), true);
  assert.equal(round.isPaused, true);
  assert.equal(clock.activeTimerCount, 0);
  assert.deepEqual(round.applyAction("correct", version!, "A", 3), { ok: false, error: "round-not-active" });
  assert.equal(round.resume("clue-giver-reconnect"), true);
  assert.equal(round.publicState.roundEndsAt, clock.now() + 37_400);
  assert.equal(clock.activeTimerCount, 1);
  assert.equal(round.resume("captain"), false);
  clock.advance(37_399);
  assert.equal(expiredCount(), 0);
  clock.advance(1);
  assert.equal(expiredCount(), 1);
  assert.equal(clock.activeTimerCount, 0);
  assert.deepEqual(round.publicState.pauseCauses, { captain: false, "clue-giver-reconnect": false });
});
