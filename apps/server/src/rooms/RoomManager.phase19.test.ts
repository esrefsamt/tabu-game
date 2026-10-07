import assert from "node:assert/strict";
import test from "node:test";
import type { CardAction } from "@tabu/shared";
import { FakeRoundClock } from "../game/FakeRoundClock.test-helper.js";
import { RoomManager } from "./RoomManager.js";

function fixture() {
  const clock = new FakeRoundClock();
  const rooms = new RoomManager(clock);
  const code = rooms.createRoom("a1", "Host").code;
  for (const id of ["a2", "a3", "b1", "b2"]) assert.equal(rooms.joinRoom(id, id, code).ok, true);
  for (const [id, team] of [["a1", "A"], ["a2", "A"], ["a3", "A"], ["b1", "B"], ["b2", "B"]] as const) {
    assert.equal(rooms.movePlayer(code, "a1", { playerId: id, team }).ok, true);
  }
  assert.equal(rooms.setCaptain(code, "a1", { team: "A", captainId: "a2" }).ok, true);
  assert.equal(rooms.setCaptain(code, "a1", { team: "B", captainId: "b2" }).ok, true);
  assert.equal(rooms.updateSettings(code, "a1", { setting: "targetScore", value: 10 }).ok, true);
  assert.equal(rooms.startGame(code, "a1").ok, true);
  return { rooms, clock, code, state: () => rooms.getRoomState(code)! };
}

function pause(f: ReturnType<typeof fixture>, player: string, paused: boolean) {
  return f.rooms.setManualPause(f.code, player, { paused });
}

function act(f: ReturnType<typeof fixture>, player: string, action: CardAction) {
  const version = f.rooms.getPersonalGameView(f.code, player)!.cardVersion!;
  assert.ok(version);
  return f.rooms.cardAction(f.code, player, { action, cardVersion: version });
}

test("only current captains may pause active rounds and all game state freezes", () => {
  const f = fixture();
  assert.deepEqual(pause(f, "a2", true), { ok: false, error: "round-not-active" });
  assert.deepEqual(f.rooms.setManualPause(f.code, "stranger", { paused: true }), { ok: false, error: "not-in-room" });
  assert.equal(f.rooms.selectPowerUp(f.code, "a1", { powerUp: "double-score" }).ok, true);
  assert.equal(f.rooms.startRound(f.code, "a1").ok, true);
  assert.deepEqual(pause(f, "a1", true), { ok: false, error: "not-captain" });
  assert.deepEqual(pause(f, "a3", true), { ok: false, error: "not-captain" });
  assert.deepEqual(pause(f, "b1", true), { ok: false, error: "not-captain" });
  assert.deepEqual(f.rooms.setManualPause(f.code, "a2", { paused: "yes" }), { ok: false, error: "invalid-request" });
  assert.equal(act(f, "a1", "correct").ok, true);
  assert.equal(act(f, "a1", "pass").ok, true);
  f.clock.advance(22_600);
  const before = f.state();
  const card = f.rooms.getPersonalGameView(f.code, "a1")!;
  assert.equal(pause(f, "a2", true).ok, true);
  assert.deepEqual(f.state().game.pauseCauses, { captain: true, "clue-giver-reconnect": false });
  assert.equal(f.state().game.roundPausedRemainingMs, 37_400);
  assert.equal(f.state().game.roundEndsAt, null);
  assert.equal(f.state().game.activePowerUp, "double-score");
  assert.match(f.state().recentEvents.at(-1)!.text, /Host|a2 oyunu duraklattı/);
  for (const action of ["correct", "pass", "tabu"] as const) {
    assert.deepEqual(act(f, "a1", action), { ok: false, error: "round-not-active" });
  }
  f.clock.advance(100_000);
  assert.equal(f.state().game.roundPausedRemainingMs, 37_400);
  assert.equal(f.state().game.roundId, before.game.roundId);
  assert.equal(f.state().game.scores.A, before.game.scores.A);
  assert.equal(f.state().game.passesUsed, before.game.passesUsed);
  assert.deepEqual(f.state().game.completedRounds, before.game.completedRounds);
  assert.equal(f.rooms.getPersonalGameView(f.code, "a1")!.currentCard?.id, card.currentCard?.id);
  assert.equal(f.rooms.getPersonalGameView(f.code, "a1")!.cardVersion, card.cardVersion);
  assert.deepEqual(pause(f, "b2", true), { ok: false, error: "invalid-pause-state" });
  assert.equal(pause(f, "b2", false).ok, true);
  assert.equal(f.state().game.roundEndsAt, f.clock.now() + 37_400);
  assert.equal(f.state().recentEvents.at(-1)!.text, "Oyun devam ediyor.");
  assert.equal(act(f, "a1", "correct").ok, true);
  f.clock.advance(37_400);
  assert.equal(f.state().game.completedRounds.A, 1);
  f.clock.advance(60_000);
  assert.equal(f.state().game.completedRounds.A, 1);
});

test("captain cooldown blocks rapid toggles and disconnected captains do not clear manual pause", () => {
  const f = fixture();
  f.rooms.startRound(f.code, "a1");
  assert.equal(pause(f, "b2", true).ok, true);
  assert.deepEqual(pause(f, "a2", false), { ok: false, error: "pause-cooldown" });
  const historyCount = f.state().recentEvents.length;
  assert.equal(f.rooms.temporarilyDisconnectPlayer(f.code, "b2")?.game.pauseCauses.captain, true);
  assert.deepEqual(pause(f, "b2", false), { ok: false, error: "not-in-room" });
  assert.equal(f.state().recentEvents.length, historyCount);
  f.clock.advance(900);
  assert.equal(pause(f, "a2", false).ok, true);
  assert.deepEqual(pause(f, "b2", true), { ok: false, error: "not-in-room" });
  assert.deepEqual(pause(f, "a2", true), { ok: false, error: "pause-cooldown" });
  f.clock.advance(900);
  assert.equal(pause(f, "a2", true).ok, true);
  f.rooms.removePlayer(f.code, "a2");
  assert.equal(f.state().game.pauseCauses.captain, true);
  f.rooms.removePlayer(f.code, "b2");
  assert.equal(f.state().game.pauseCauses.captain, false);
  assert.equal(f.state().game.roundPausedRemainingMs, null);
});

test("reconnect-only pause cannot be cleared by captains", () => {
  const f = fixture();
  f.rooms.startRound(f.code, "a1");
  f.clock.advance(10_000);
  const paused = f.rooms.temporarilyDisconnectPlayer(f.code, "a1")!;
  assert.deepEqual(paused.game.pauseCauses, { captain: false, "clue-giver-reconnect": true });
  assert.deepEqual(pause(f, "a2", false), { ok: false, error: "invalid-pause-state" });
  assert.deepEqual(pause(f, "b2", true), { ok: false, error: "invalid-pause-state" });
  f.clock.advance(50_000);
  assert.equal(f.state().game.roundPausedRemainingMs, 50_000);
  assert.equal(f.rooms.reconnectPlayer(f.code, "a1")!.game.roundEndsAt, f.clock.now() + 50_000);
  assert.deepEqual(f.state().game.pauseCauses, { captain: false, "clue-giver-reconnect": false });
});

test("manual pause and reconnect pause clear independently in either order", () => {
  for (const clearReconnectFirst of [false, true]) {
    const f = fixture();
    f.rooms.selectPowerUp(f.code, "a1", { powerUp: "attack-score" });
    f.rooms.startRound(f.code, "a1");
    f.clock.advance(15_250);
    const card = f.rooms.getPersonalGameView(f.code, "a1")!;
    assert.equal(pause(f, "a2", true).ok, true);
    f.rooms.temporarilyDisconnectPlayer(f.code, "a1");
    assert.deepEqual(f.state().game.pauseCauses, { captain: true, "clue-giver-reconnect": true });
    f.clock.advance(10_000);
    if (clearReconnectFirst) {
      f.rooms.reconnectPlayer(f.code, "a1");
      assert.equal(f.state().game.pauseCauses.captain, true);
      assert.equal(f.state().game.roundEndsAt, null);
      assert.equal(pause(f, "b2", false).ok, true);
    } else {
      assert.equal(pause(f, "b2", false).ok, true);
      assert.equal(f.state().game.pauseCauses["clue-giver-reconnect"], true);
      assert.equal(f.state().game.roundEndsAt, null);
      assert.equal(f.state().recentEvents.at(-1)?.text, "Kaptan duraklatması kaldırıldı; anlatıcı bekleniyor.");
      f.rooms.reconnectPlayer(f.code, "a1");
    }
    assert.deepEqual(f.state().game.pauseCauses, { captain: false, "clue-giver-reconnect": false });
    assert.equal(f.state().game.roundEndsAt, f.clock.now() + 44_750);
    assert.equal(f.state().game.activePowerUp, "attack-score");
    assert.equal(f.state().game.powerUps.A["attack-score"], false);
    assert.equal(f.rooms.getPersonalGameView(f.code, "a1")!.currentCard?.id, card.currentCard?.id);
    assert.equal(f.rooms.getPersonalGameView(f.code, "a1")!.cardVersion, card.cardVersion);
    assert.deepEqual(f.state().game.completedRounds, { A: 0, B: 0 });
    assert.equal(act(f, "a1", "correct").ok, true);
    assert.equal(f.state().game.scores.B, -1);
  }
});

test("manual pause preserves fair ending and rematch begins without pause causes", () => {
  const f = fixture();
  f.rooms.startRound(f.code, "a1");
  for (let i = 0; i < 10; i++) assert.equal(act(f, "a1", "correct").ok, true);
  assert.equal(pause(f, "a2", true).ok, true);
  assert.equal(f.state().game.winnerTeam, null);
  assert.deepEqual(f.state().game.completedRounds, { A: 0, B: 0 });
  f.clock.advance(900);
  assert.equal(pause(f, "b2", false).ok, true);
  f.clock.advance(60_000);
  assert.equal(f.state().game.winnerTeam, null);
  assert.deepEqual(f.state().game.completedRounds, { A: 1, B: 0 });
  f.rooms.startRound(f.code, "b1");
  f.clock.advance(60_000);
  assert.equal(f.state().game.winnerTeam, "A");
  assert.equal(f.rooms.returnToLobby(f.code, "a1").ok, true);
  assert.deepEqual(f.state().game.pauseCauses, { captain: false, "clue-giver-reconnect": false });
  assert.equal(f.rooms.startGame(f.code, "a1").ok, true);
  assert.deepEqual(f.state().game.pauseCauses, { captain: false, "clue-giver-reconnect": false });
});
