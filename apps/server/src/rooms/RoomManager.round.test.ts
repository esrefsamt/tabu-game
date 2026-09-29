import assert from "node:assert/strict";
import test from "node:test";
import type { RoomState } from "@tabu/shared";
import { FakeRoundClock } from "../game/FakeRoundClock.test-helper.js";
import { RoomManager } from "./RoomManager.js";

function prepareGame(passLimit: 0 | 1 | 2 | 3 | 4 | 5 | 10 = 3) {
  const clock = new FakeRoundClock();
  const rooms = new RoomManager(clock);
  const published: RoomState[] = [];
  rooms.setStatePublisher((_roomCode, room) => published.push(room));
  const code = rooms.createRoom("a1", "A1").code;
  for (const id of ["a2", "b1", "b2"]) {
    assert.equal(rooms.joinRoom(id, id.toUpperCase(), code).ok, true);
  }
  for (const id of ["a1", "a2"]) assert.equal(rooms.movePlayer(code, "a1", { playerId: id, team: "A" }).ok, true);
  for (const id of ["b1", "b2"]) assert.equal(rooms.movePlayer(code, "a1", { playerId: id, team: "B" }).ok, true);
  assert.equal(rooms.setCaptain(code, "a1", { team: "A", captainId: "a2" }).ok, true);
  assert.equal(rooms.setCaptain(code, "a1", { team: "B", captainId: "b1" }).ok, true);
  assert.equal(rooms.updateSettings(code, "a1", { setting: "roundDurationSeconds", value: 30 }).ok, true);
  assert.equal(rooms.updateSettings(code, "a1", { setting: "passLimit", value: passLimit }).ok, true);
  assert.equal(rooms.startGame(code, "a1").ok, true);
  return { rooms, code, clock, published };
}

function startedRound(passLimit: 0 | 1 | 2 | 3 | 4 | 5 | 10 = 3) {
  const fixture = prepareGame(passLimit);
  const started = fixture.rooms.startRound(fixture.code, "a1");
  assert.equal(started.ok, true);
  if (!started.ok) throw new Error("Round did not start.");
  return { ...fixture, state: started.room };
}

test("only the current clue giver can start a round and starting draws a card", () => {
  const { rooms, code, clock } = prepareGame();
  assert.deepEqual(rooms.startRound(code, "b1"), { ok: false, error: "not-clue-giver" });
  assert.deepEqual(rooms.startRound(code, "a2"), { ok: false, error: "not-clue-giver" });
  const started = rooms.startRound(code, "a1");
  assert.equal(started.ok, true);
  if (started.ok) {
    assert.equal(started.room.game.phase, "round-active");
    assert.equal(started.room.game.roundEndsAt, clock.now() + 30_000);
  }
  assert.ok(rooms.getPersonalGameView(code, "a1")?.currentCard);
  assert.deepEqual(rooms.startRound(code, "a1"), { ok: false, error: "round-not-ready" });
});

test("Team A clue giver and every Team B player see only the current card", () => {
  const { rooms, code, state } = startedRound();
  const clueView = rooms.getPersonalGameView(code, "a1")!;
  const teammateView = rooms.getPersonalGameView(code, "a2")!;
  const captainView = rooms.getPersonalGameView(code, "b1")!;
  const opponentView = rooms.getPersonalGameView(code, "b2")!;
  assert.equal(clueView.currentCard?.forbiddenWords.length, 5);
  assert.deepEqual(teammateView, { roundId: clueView.roundId, currentCard: null, cardVersion: null });
  assert.equal(JSON.stringify(teammateView).includes(clueView.currentCard!.word), false);
  assert.deepEqual(captainView.currentCard, clueView.currentCard);
  assert.deepEqual(opponentView.currentCard, clueView.currentCard);
  assert.equal(state.game.roundId, clueView.roundId);
  assert.equal(Object.hasOwn(state, "deck"), false);
  assert.equal(Object.hasOwn(state.game, "currentCard"), false);
  assert.equal(JSON.stringify(state).includes("forbiddenWords"), false);
  assert.deepEqual(Object.keys(clueView).sort(), ["cardVersion", "currentCard", "roundId"]);
});

test("Correct adds one point and stale Correct or Tabu cannot score again", () => {
  const { rooms, code, state } = startedRound();
  const firstView = rooms.getPersonalGameView(code, "a1")!;
  const version = firstView.cardVersion!;
  const correct = rooms.cardAction(code, "a1", { action: "correct", cardVersion: version });
  assert.equal(correct.ok, true);
  if (correct.ok) {
    assert.deepEqual(correct.cardResult, { action: "correct", word: firstView.currentCard!.word });
    assert.deepEqual(Object.keys(correct.cardResult).sort(), ["action", "word"]);
  }
  const nextView = rooms.getPersonalGameView(code, "a1")!;
  assert.notEqual(nextView.currentCard?.id, firstView.currentCard?.id);
  assert.notEqual(nextView.cardVersion, version);
  assert.deepEqual(rooms.cardAction(code, "a1", { action: "correct", cardVersion: version }), {
    ok: false, error: "stale-card"
  });
  assert.deepEqual(rooms.cardAction(code, "b1", { action: "tabu", cardVersion: version }), {
    ok: false, error: "stale-card"
  });
  assert.equal(rooms.cardAction(code, "a2", { action: "correct", cardVersion: nextView.cardVersion }).ok, false);
  assert.equal(state.game.scores.A, 0);
  const latest = rooms.cardAction(code, "a1", { action: "pass", cardVersion: nextView.cardVersion });
  if (latest.ok) assert.equal(latest.room.game.scores.A, 1);
});

test("Pass consumes a pass but no score, and the configured limit is enforced", () => {
  const { rooms, code } = startedRound(1);
  const version = rooms.getPersonalGameView(code, "a1")!.cardVersion!;
  const passed = rooms.cardAction(code, "a1", { action: "pass", cardVersion: version });
  assert.equal(passed.ok, true);
  if (passed.ok) {
    assert.equal(passed.cardResult.word.length > 0, true);
    assert.equal(passed.cardResult.action, "pass");
    assert.equal(passed.room.game.passesUsed, 1);
    assert.deepEqual(passed.room.game.scores, { A: 0, B: 0 });
  }
  const nextVersion = rooms.getPersonalGameView(code, "a1")!.cardVersion!;
  assert.deepEqual(rooms.cardAction(code, "a1", { action: "pass", cardVersion: nextVersion }), {
    ok: false, error: "pass-limit-reached"
  });
});

test("pass limit zero prevents passing", () => {
  const { rooms, code } = startedRound(0);
  const version = rooms.getPersonalGameView(code, "a1")!.cardVersion!;
  assert.deepEqual(rooms.cardAction(code, "a1", { action: "pass", cardVersion: version }), {
    ok: false, error: "pass-limit-reached"
  });
});

test("clue giver and opposing captain may call Tabu; other players cannot", () => {
  const { rooms, code } = startedRound();
  let version = rooms.getPersonalGameView(code, "a1")!.cardVersion!;
  assert.deepEqual(rooms.cardAction(code, "a2", { action: "tabu", cardVersion: version }), {
    ok: false, error: "not-authorized"
  });
  assert.deepEqual(rooms.cardAction(code, "b2", { action: "tabu", cardVersion: version }), {
    ok: false, error: "not-authorized"
  });
  const selfTabu = rooms.cardAction(code, "a1", { action: "tabu", cardVersion: version });
  assert.equal(selfTabu.ok, true);
  if (selfTabu.ok) {
    assert.equal(selfTabu.room.game.scores.A, -1);
    assert.equal(selfTabu.cardResult.action, "tabu");
  }
  version = rooms.getPersonalGameView(code, "b1")!.cardVersion!;
  const captainTabu = rooms.cardAction(code, "b1", { action: "tabu", cardVersion: version });
  assert.equal(captainTabu.ok, true);
  if (captainTabu.ok) assert.equal(captainTabu.room.game.scores.A, -2);
  assert.notEqual(rooms.getPersonalGameView(code, "b1")!.cardVersion, version);
});

test("expiration ends exactly once, switches to Team B, and leaves the next round stopped", () => {
  const { rooms, code, clock, published } = startedRound();
  const version = rooms.getPersonalGameView(code, "a1")!.cardVersion!;
  assert.equal(rooms.cardAction(code, "a1", { action: "correct", cardVersion: version }).ok, true);
  clock.advance(30_000);
  assert.equal(published.length, 1);
  const after = published[0]!;
  assert.equal(after.game.phase, "turn-preparation");
  assert.equal(after.game.activeTeam, "B");
  assert.equal(after.game.clueGiverId, "b1");
  assert.equal(after.game.scores.A, 1);
  assert.equal(after.game.roundEndsAt, null);
  assert.equal(after.game.roundId, null);
  assert.equal(after.game.passesUsed, 0);
  assert.equal(clock.activeTimerCount, 0);
  assert.equal(rooms.getPersonalGameView(code, "a1")?.currentCard, null);
  assert.deepEqual(rooms.cardAction(code, "a1", { action: "correct", cardVersion: version }), {
    ok: false, error: "round-not-active"
  });
  clock.advance(30_000);
  assert.equal(published.length, 1);
});

test("the next round reverses card visibility and keeps scores while resetting passes", () => {
  const { rooms, code, clock } = startedRound(1);
  const version = rooms.getPersonalGameView(code, "a1")!.cardVersion!;
  assert.equal(rooms.cardAction(code, "a1", { action: "correct", cardVersion: version }).ok, true);
  const passVersion = rooms.getPersonalGameView(code, "a1")!.cardVersion!;
  assert.equal(rooms.cardAction(code, "a1", { action: "pass", cardVersion: passVersion }).ok, true);
  clock.advance(30_000);
  assert.deepEqual(rooms.startRound(code, "a1"), { ok: false, error: "not-clue-giver" });
  const next = rooms.startRound(code, "b1");
  assert.equal(next.ok, true);
  if (next.ok) {
    assert.equal(next.room.game.phase, "round-active");
    assert.equal(next.room.game.scores.A, 1);
    assert.equal(next.room.game.passesUsed, 0);
  }
  const bCard = rooms.getPersonalGameView(code, "b1")?.currentCard;
  assert.ok(bCard);
  assert.equal(rooms.getPersonalGameView(code, "b2")?.currentCard, null);
  assert.deepEqual(rooms.getPersonalGameView(code, "a1")?.currentCard, bCard);
  assert.deepEqual(rooms.getPersonalGameView(code, "a2")?.currentCard, bCard);
});

test("active clue-giver disconnect aborts without scoring and advances to the other team", () => {
  const { rooms, code, clock } = startedRound();
  const after = rooms.removePlayer(code, "a1");
  assert.equal(after?.game.phase, "turn-preparation");
  assert.equal(after?.game.activeTeam, "B");
  assert.equal(after?.game.clueGiverId, "b1");
  assert.deepEqual(after?.game.scores, { A: 0, B: 0 });
  assert.equal(after?.game.roundEndsAt, null);
  assert.equal(rooms.getPersonalGameView(code, "b1")?.currentCard, null);
  assert.equal(clock.activeTimerCount, 0);
});

test("non-clue-giver disconnect keeps the round active; opposing captain cleanup removes intervention", () => {
  const { rooms, code, clock } = startedRound();
  const afterNormal = rooms.removePlayer(code, "a2");
  assert.equal(afterNormal?.game.phase, "round-active");
  const afterCaptain = rooms.removePlayer(code, "b1");
  assert.equal(afterCaptain?.game.phase, "round-active");
  assert.equal(afterCaptain?.captainBId, null);
  const version = rooms.getPersonalGameView(code, "b2")!.cardVersion!;
  assert.deepEqual(rooms.cardAction(code, "b2", { action: "tabu", cardVersion: version }), {
    ok: false, error: "not-authorized"
  });
  assert.equal(clock.activeTimerCount, 1);
});

test("removing the room clears its timer", () => {
  const { rooms, code, clock } = startedRound();
  for (const playerId of ["a1", "a2", "b1", "b2"]) rooms.removePlayer(code, playerId);
  assert.equal(clock.activeTimerCount, 0);
  clock.advance(30_000);
  assert.equal(rooms.getPersonalGameView(code, "b1"), null);
});

test("a team becoming empty during a round stops the timer and marks the game unavailable", () => {
  const { rooms, code, clock } = startedRound();
  rooms.removePlayer(code, "b2");
  const after = rooms.removePlayer(code, "b1");
  assert.equal(after?.game.phase, "unable-to-continue");
  assert.equal(after?.game.error, "team-empty");
  assert.equal(after?.game.roundEndsAt, null);
  assert.equal(clock.activeTimerCount, 0);
});
