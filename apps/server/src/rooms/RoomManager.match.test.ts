import assert from "node:assert/strict";
import test from "node:test";
import type { RoomState, TargetScore } from "@tabu/shared";
import { FakeRoundClock } from "../game/FakeRoundClock.test-helper.js";
import { RoomManager } from "./RoomManager.js";

function matchFixture() {
  const clock = new FakeRoundClock();
  const rooms = new RoomManager(clock);
  const published: RoomState[] = [];
  rooms.setStatePublisher((_code, state) => published.push(state));
  const code = rooms.createRoom("a1", "A1").code;
  assert.equal(rooms.joinRoom("a2", "A2", code).ok, true);
  assert.equal(rooms.joinRoom("b1", "B1", code).ok, true);
  for (const [id, team] of [["a1", "A"], ["a2", "A"], ["b1", "B"]] as const) {
    assert.equal(rooms.movePlayer(code, "a1", { playerId: id, team }).ok, true);
  }
  assert.equal(rooms.setCaptain(code, "a1", { team: "A", captainId: "a1" }).ok, true);
  assert.equal(rooms.setCaptain(code, "a1", { team: "B", captainId: "b1" }).ok, true);
  return { rooms, clock, code, published };
}

function score(rooms: RoomManager, code: string, playerId: string, count: number): void {
  for (let index = 0; index < count; index += 1) {
    const version = rooms.getPersonalGameView(code, playerId)?.cardVersion;
    assert.ok(version);
    assert.equal(rooms.cardAction(code, playerId, { action: "correct", cardVersion: version }).ok, true);
  }
}

function playRound(rooms: RoomManager, clock: FakeRoundClock, code: string, playerId: string, points: number): RoomState {
  assert.equal(rooms.startRound(code, playerId).ok, true);
  score(rooms, code, playerId, points);
  clock.advance(60_000);
  return rooms.getRoomState(code)!;
}

test("equal completed turns decide 10 vs 9 and 10 vs 12, but neither below-target lead nor an unequal turn can win", () => {
  for (const [aPoints, bPoints, winner] of [[10, 9, "A"], [10, 12, "B"], [8, 6, null]] as const) {
    const { rooms, code, clock } = matchFixture();
    assert.equal(rooms.updateSettings(code, "a1", { setting: "targetScore", value: 10 }).ok, true);
    assert.equal(rooms.startGame(code, "a1").ok, true);
    const afterA = playRound(rooms, clock, code, "a1", aPoints);
    assert.deepEqual(afterA.game.completedRounds, { A: 1, B: 0 });
    assert.equal(afterA.game.winnerTeam, null);
    assert.equal(afterA.game.activeTeam, "B");
    const afterB = playRound(rooms, clock, code, "b1", bPoints);
    assert.deepEqual(afterB.game.completedRounds, { A: 1, B: 1 });
    assert.equal(afterB.game.winnerTeam, winner);
    if (!winner) assert.equal(afterB.game.activeTeam, "A");
  }
});

test("a temporary target hit does not win if Tabu reduces the final score below target", () => {
  const { rooms, code, clock } = matchFixture();
  rooms.updateSettings(code, "a1", { setting: "targetScore", value: 10 });
  rooms.startGame(code, "a1");
  rooms.startRound(code, "a1");
  score(rooms, code, "a1", 10);
  const version = rooms.getPersonalGameView(code, "b1")?.cardVersion;
  assert.ok(version);
  assert.equal(rooms.cardAction(code, "b1", { action: "tabu", cardVersion: version }).ok, true);
  assert.equal(rooms.getRoomState(code)?.game.scores.A, 9);
  clock.advance(60_000);
  const afterB = playRound(rooms, clock, code, "b1", 0);
  assert.deepEqual(afterB.game.completedRounds, { A: 1, B: 1 });
  assert.equal(afterB.game.winnerTeam, null);
});

test("a tie at target enters paired overtime, and further ties continue until an equal-turn lead", () => {
  const { rooms, code, clock } = matchFixture();
  assert.equal(rooms.updateSettings(code, "a1", { setting: "targetScore", value: 10 }).ok, true);
  assert.equal(rooms.startGame(code, "a1").ok, true);
  playRound(rooms, clock, code, "a1", 12);
  let state = playRound(rooms, clock, code, "b1", 12);
  assert.deepEqual(state.game.scores, { A: 12, B: 12 });
  assert.deepEqual(state.game.completedRounds, { A: 1, B: 1 });
  assert.equal(state.game.winnerTeam, null);
  assert.equal(state.game.isOvertime, true);

  state = playRound(rooms, clock, code, "a2", 1);
  assert.deepEqual(state.game.completedRounds, { A: 2, B: 1 });
  assert.equal(state.game.winnerTeam, null);
  state = playRound(rooms, clock, code, "b1", 1);
  assert.deepEqual(state.game.completedRounds, { A: 2, B: 2 });
  assert.equal(state.game.winnerTeam, null);
  assert.equal(state.game.isOvertime, true);

  playRound(rooms, clock, code, "a1", 2);
  state = playRound(rooms, clock, code, "b1", 1);
  assert.deepEqual(state.game.scores, { A: 15, B: 14 });
  assert.deepEqual(state.game.completedRounds, { A: 3, B: 3 });
  assert.equal(state.game.winnerTeam, "A");
  assert.equal(state.game.phase, "game-over");
});

test("pause and resume do not complete a turn; permanent clue-giver departure completes it once", () => {
  const { rooms, code, clock } = matchFixture();
  assert.equal(rooms.updateSettings(code, "a1", { setting: "targetScore", value: 10 }).ok, true);
  assert.equal(rooms.startGame(code, "a1").ok, true);
  assert.equal(rooms.startRound(code, "a1").ok, true);
  score(rooms, code, "a1", 10);
  assert.equal(rooms.temporarilyDisconnectPlayer(code, "a1")?.game.roundPausedRemainingMs, 60_000);
  clock.advance(90_000);
  assert.deepEqual(rooms.getRoomState(code)?.game.completedRounds, { A: 0, B: 0 });
  assert.equal(rooms.reconnectPlayer(code, "a1")?.game.roundPausedRemainingMs, null);
  assert.equal(rooms.removePlayer(code, "a1")?.game.activeTeam, "B");
  assert.deepEqual(rooms.getRoomState(code)?.game.completedRounds, { A: 1, B: 0 });
  clock.advance(90_000);
  assert.deepEqual(rooms.getRoomState(code)?.game.completedRounds, { A: 1, B: 0 });
  assert.equal(rooms.startRound(code, "b1").ok, true);
  clock.advance(60_000);
  assert.deepEqual(rooms.getRoomState(code)?.game.completedRounds, { A: 1, B: 1 });
  assert.equal(rooms.getRoomState(code)?.game.winnerTeam, "A");
});

test("target score defaults to 30 and only the host can set an allowed value in the lobby", () => {
  const { rooms, code } = matchFixture();
  assert.equal(rooms.createRoom("other", "Other").settings.targetScore, 30);
  assert.deepEqual(rooms.updateSettings(code, "a2", { setting: "targetScore", value: 10 }), {
    ok: false, error: "not-host"
  });
  for (const value of [10, 15, 20, 25, 30, 40, 50] as TargetScore[]) {
    const updated = rooms.updateSettings(code, "a1", { setting: "targetScore", value });
    assert.equal(updated.ok, true);
    if (updated.ok) assert.equal(updated.room.settings.targetScore, value);
  }
  for (const value of [9, 11, 35, "10", null, {}, 100]) {
    assert.deepEqual(rooms.updateSettings(code, "a1", { setting: "targetScore", value }), {
      ok: false, error: "invalid-settings"
    });
  }
  assert.deepEqual(rooms.updateSettings(code, "a1", { setting: "targetScore", value: 10, extra: true }), {
    ok: false, error: "invalid-settings"
  });
  assert.deepEqual(rooms.updateSettings(code, "outsider", { setting: "targetScore", value: 10 }), {
    ok: false, error: "not-in-room"
  });
  assert.equal(rooms.updateSettings(code, "a1", { setting: "targetScore", value: 10 }).ok, true);
  const started = rooms.startGame(code, "a1");
  assert.equal(started.ok, true);
  if (started.ok) assert.equal(started.room.settings.targetScore, 10);
  assert.deepEqual(rooms.updateSettings(code, "a1", { setting: "targetScore", value: 50 }), {
    ok: false, error: "game-already-started"
  });
});

test("target Correct keeps Team A's round active; winner waits for Team B's equal turn", () => {
  const { rooms, clock, code, published } = matchFixture();
  assert.equal(rooms.updateSettings(code, "a1", { setting: "targetScore", value: 10 }).ok, true);
  assert.equal(rooms.startGame(code, "a1").ok, true);
  const started = rooms.startRound(code, "a1");
  assert.equal(started.ok, true);
  assert.ok(rooms.getPersonalGameView(code, "a1")?.currentCard);
  assert.equal(rooms.getPersonalGameView(code, "a2")?.currentCard, null);
  assert.ok(rooms.getPersonalGameView(code, "b1")?.currentCard);

  let winningVersion = 0;
  for (let score = 1; score <= 10; score += 1) {
    const view = rooms.getPersonalGameView(code, "a1")!;
    const version = view.cardVersion!;
    winningVersion = version;
    const result = rooms.cardAction(code, "a1", { action: "correct", cardVersion: version });
    assert.equal(result.ok, true);
    if (!result.ok) throw new Error("Correct action failed.");
    assert.deepEqual(result.cardResult, { action: "correct", word: view.currentCard!.word });
    assert.equal(result.room.game.scores.A, score);
    assert.equal(result.room.game.phase, "round-active");
    assert.equal(result.room.game.winnerTeam, null);
    assert.ok(rooms.getPersonalGameView(code, "a1")?.currentCard);
  }
  assert.deepEqual(rooms.getRoomState(code)?.game.completedRounds, { A: 0, B: 0 });
  assert.equal(clock.activeTimerCount, 1);
  clock.advance(60_000);
  assert.deepEqual(rooms.getRoomState(code)?.game.completedRounds, { A: 1, B: 0 });
  assert.equal(rooms.getRoomState(code)?.game.phase, "turn-preparation");
  assert.equal(rooms.startRound(code, "b1").ok, true);
  clock.advance(60_000);
  assert.deepEqual(rooms.getRoomState(code)?.game.completedRounds, { A: 1, B: 1 });
  assert.equal(rooms.getRoomState(code)?.game.winnerTeam, "A");
  assert.equal(clock.activeTimerCount, 0);
  for (const id of ["a1", "a2", "b1"]) {
    assert.deepEqual(rooms.getPersonalGameView(code, id), {
      roundId: null, cardVersion: null, currentCard: null
    });
  }
  for (const action of ["correct", "pass", "tabu"] as const) {
    assert.deepEqual(rooms.cardAction(code, "a1", { action, cardVersion: winningVersion }), {
      ok: false, error: "round-not-active"
    });
  }
  assert.deepEqual(rooms.startRound(code, "a1"), { ok: false, error: "round-not-ready" });
  assert.equal(rooms.advanceTurn(code), null);
  assert.deepEqual(rooms.joinRoom("late", "Late", code), { ok: false, error: "game-already-started" });
  assert.deepEqual(rooms.movePlayer(code, "a1", { playerId: "a2", team: "B" }), {
    ok: false, error: "game-already-started"
  });
  assert.deepEqual(rooms.setCaptain(code, "a1", { team: "A", captainId: "a2" }), {
    ok: false, error: "game-already-started"
  });
  assert.deepEqual(rooms.updateSettings(code, "a1", { setting: "targetScore", value: 50 }), {
    ok: false, error: "game-already-started"
  });
  clock.advance(60_000);
  assert.equal(published.length, 2);
  const afterDisconnect = rooms.removePlayer(code, "a1");
  assert.equal(afterDisconnect?.game.phase, "game-over");
  assert.equal(afterDisconnect?.game.winnerTeam, "A");
  assert.deepEqual(afterDisconnect?.game.scores, { A: 10, B: 0 });
  assert.equal(afterDisconnect?.players.find((player) => player.id === "a2")?.isHost, true);
});

test("Team B wins only after its matching round finishes", () => {
  const { rooms, clock, code, published } = matchFixture();
  assert.equal(rooms.updateSettings(code, "a1", { setting: "targetScore", value: 10 }).ok, true);
  assert.equal(rooms.startGame(code, "a1").ok, true);
  assert.equal(rooms.startRound(code, "a1").ok, true);
  clock.advance(60_000);
  assert.equal(published.at(-1)?.game.activeTeam, "B");
  assert.equal(rooms.startRound(code, "b1").ok, true);
  for (let score = 1; score <= 10; score += 1) {
    const version = rooms.getPersonalGameView(code, "b1")?.cardVersion;
    assert.ok(version);
    const result = rooms.cardAction(code, "b1", { action: "correct", cardVersion: version });
    assert.equal(result.ok, true);
    if (result.ok) assert.equal(result.room.game.winnerTeam, null);
  }
  assert.equal(clock.activeTimerCount, 1);
  clock.advance(60_000);
  assert.equal(rooms.getRoomState(code)?.game.winnerTeam, "B");
  assert.deepEqual(rooms.getRoomState(code)?.game.scores, { A: 0, B: 10 });
  assert.equal(clock.activeTimerCount, 0);
  assert.equal(rooms.advanceTurn(code), null);
  clock.advance(60_000);
  assert.equal(published.length, 2);
});
