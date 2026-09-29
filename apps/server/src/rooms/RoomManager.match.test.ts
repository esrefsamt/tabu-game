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

test("winning Correct ends the match once, clears private cards and timer, and freezes the result", () => {
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
    if (score < 10) {
      assert.equal(result.room.game.phase, "round-active");
      assert.equal(result.room.game.winnerTeam, null);
      assert.ok(rooms.getPersonalGameView(code, "a1")?.currentCard);
    } else {
      assert.equal(result.room.game.phase, "game-over");
      assert.equal(result.room.game.winnerTeam, "A");
      assert.deepEqual(result.room.game.scores, { A: 10, B: 0 });
      assert.equal(result.room.game.roundId, null);
      assert.equal(result.room.game.roundEndsAt, null);
      assert.equal(result.room.game.activeTeam, null);
      assert.equal(result.room.game.clueGiverId, null);
    }
  }

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
  assert.equal(published.length, 0);
  const afterDisconnect = rooms.removePlayer(code, "a1");
  assert.equal(afterDisconnect?.game.phase, "game-over");
  assert.equal(afterDisconnect?.game.winnerTeam, "A");
  assert.deepEqual(afterDisconnect?.game.scores, { A: 10, B: 0 });
  assert.equal(afterDisconnect?.players.find((player) => player.id === "a2")?.isHost, true);
});

test("Team B can win on its turn without advancing again", () => {
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
    if (result.ok && score === 10) {
      assert.equal(result.room.game.winnerTeam, "B");
      assert.deepEqual(result.room.game.scores, { A: 0, B: 10 });
    }
  }
  assert.equal(clock.activeTimerCount, 0);
  assert.equal(rooms.advanceTurn(code), null);
  clock.advance(60_000);
  assert.equal(published.length, 1);
});
