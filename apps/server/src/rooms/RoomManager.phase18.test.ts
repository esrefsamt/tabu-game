import assert from "node:assert/strict";
import test from "node:test";
import type { CardAction, PowerUp } from "@tabu/shared";
import { FakeRoundClock } from "../game/FakeRoundClock.test-helper.js";
import { RoomManager } from "./RoomManager.js";

function fixture() {
  const clock = new FakeRoundClock();
  const rooms = new RoomManager(clock);
  const code = rooms.createRoom("a1", "A1").code;
  for (const id of ["a2", "b1", "b2"]) assert.equal(rooms.joinRoom(id, id, code).ok, true);
  for (const [id, team] of [["a1", "A"], ["a2", "A"], ["b1", "B"], ["b2", "B"]] as const) {
    assert.equal(rooms.movePlayer(code, "a1", { playerId: id, team }).ok, true);
  }
  assert.equal(rooms.setCaptain(code, "a1", { team: "A", captainId: "a1" }).ok, true);
  assert.equal(rooms.setCaptain(code, "a1", { team: "B", captainId: "b1" }).ok, true);
  assert.equal(rooms.updateSettings(code, "a1", { setting: "targetScore", value: 10 }).ok, true);
  assert.equal(rooms.startGame(code, "a1").ok, true);
  return { rooms, clock, code, state: () => rooms.getRoomState(code)! };
}

function act(f: ReturnType<typeof fixture>, player: string, action: CardAction) {
  const view = f.rooms.getPersonalGameView(f.code, player)!;
  assert.ok(view.currentCard && view.cardVersion);
  const result = f.rooms.cardAction(f.code, player, { action, cardVersion: view.cardVersion });
  assert.equal(result.ok, true);
  if (!result.ok) throw new Error("Action failed");
  return { result, view };
}

function select(f: ReturnType<typeof fixture>, player: string, powerUp: PowerUp | null) {
  return f.rooms.selectPowerUp(f.code, player, { powerUp });
}

test("both teams have independent one-use inventories; selection is authoritative and reversible", () => {
  const f = fixture();
  assert.deepEqual(f.state().game.powerUps, {
    A: { "double-score": true, "attack-score": true },
    B: { "double-score": true, "attack-score": true }
  });
  const publicState = f.state();
  publicState.game.powerUps.A["double-score"] = false;
  assert.equal(f.state().game.powerUps.A["double-score"], true);
  assert.deepEqual(select(f, "a2", "double-score"), { ok: false, error: "not-clue-giver" });
  assert.deepEqual(select(f, "b1", "double-score"), { ok: false, error: "not-clue-giver" });
  assert.deepEqual(f.rooms.selectPowerUp(f.code, "a1", { powerUp: "bogus" }), { ok: false, error: "invalid-power-up" });
  assert.deepEqual(f.rooms.selectPowerUp(f.code, "stranger", { powerUp: null }), { ok: false, error: "not-in-room" });
  assert.equal(select(f, "a1", "double-score").ok, true);
  assert.equal(f.state().game.selectedPowerUp, "double-score");
  assert.equal(select(f, "a1", null).ok, true);
  assert.equal(select(f, "a1", "attack-score").ok, true);
  assert.equal(f.rooms.reconnectPlayer(f.code, "a1")?.game.selectedPowerUp, "attack-score");
  assert.equal(f.state().game.powerUps.A["attack-score"], true);
  assert.deepEqual(f.rooms.startRound(f.code, "a2"), { ok: false, error: "not-clue-giver" });
  assert.equal(f.state().game.powerUps.A["attack-score"], true);
  assert.equal(f.rooms.startRound(f.code, "a1").ok, true);
  assert.equal(f.state().game.powerUps.A["attack-score"], false);
  assert.equal(f.state().game.powerUps.B["attack-score"], true);
  assert.equal(f.state().game.selectedPowerUp, null);
  assert.equal(f.state().game.activePowerUp, "attack-score");
  assert.deepEqual(select(f, "a1", null), { ok: false, error: "round-not-ready" });
});

test("double score applies to every card, preserves cooldown, reconnects and ends only after equal rounds", () => {
  const f = fixture();
  assert.equal(select(f, "a1", "double-score").ok, true);
  assert.equal(f.rooms.startRound(f.code, "a1").ok, true);
  for (let i = 0; i < 5; i++) {
    const { result } = act(f, "a1", "correct");
    assert.equal(result.cardResult.scoreEffect, "+2");
    assert.match(f.state().recentEvents.at(-1)!.text, /• \+2$/);
    assert.equal(Object.hasOwn(f.state().recentEvents.at(-1)!, "forbiddenWords"), false);
  }
  const oldVersion = f.rooms.getPersonalGameView(f.code, "a1")!.cardVersion!;
  act(f, "b1", "tabu");
  assert.equal(f.state().game.scores.A, 8);
  assert.match(f.state().recentEvents.at(-1)!.text, /• -2$/);
  assert.deepEqual(f.rooms.cardAction(f.code, "b1", { action: "tabu", cardVersion: oldVersion }), { ok: false, error: "stale-card" });
  const nextVersion = f.rooms.getPersonalGameView(f.code, "b1")!.cardVersion!;
  assert.deepEqual(f.rooms.cardAction(f.code, "b1", { action: "tabu", cardVersion: nextVersion }), { ok: false, error: "tabu-cooldown" });
  assert.equal(f.state().game.scores.A, 8);
  const card = f.rooms.getPersonalGameView(f.code, "a1")!.currentCard;
  const remaining = f.rooms.temporarilyDisconnectPlayer(f.code, "a1")!.game.roundPausedRemainingMs;
  assert.equal(f.state().game.activePowerUp, "double-score");
  f.clock.advance(5000);
  assert.equal(f.rooms.reconnectPlayer(f.code, "a1")!.game.activePowerUp, "double-score");
  assert.equal(f.rooms.getPersonalGameView(f.code, "a1")!.currentCard?.id, card?.id);
  assert.equal(f.state().game.powerUps.A["double-score"], false);
  assert.equal(f.state().game.roundEndsAt, f.clock.now() + remaining!);
  act(f, "a1", "pass");
  assert.equal(f.state().game.scores.A, 8);
  act(f, "a1", "correct");
  assert.equal(f.state().game.scores.A, 10);
  assert.equal(f.state().game.winnerTeam, null);
  f.clock.advance(remaining!);
  assert.equal(f.state().game.activePowerUp, null);
  assert.equal(f.state().game.completedRounds.A, 1);
  assert.equal(f.rooms.startRound(f.code, "b1").ok, true);
  f.clock.advance(60_000);
  assert.equal(f.state().game.winnerTeam, "A");
  assert.equal(f.state().players.find((player) => player.id === "a1")?.roomWins, 1);
  assert.equal(f.rooms.returnToLobby(f.code, "a1").ok, true);
  assert.equal(f.rooms.startGame(f.code, "a1").ok, true);
  assert.equal(f.state().game.powerUps.A["double-score"], true);
  assert.equal(f.state().game.powerUps.B["attack-score"], true);
  assert.equal(f.state().game.activePowerUp, null);
});

test("attack changes only opponent score, permits negatives and remains consumed after abort", () => {
  const f = fixture();
  assert.equal(select(f, "a1", "attack-score").ok, true);
  assert.equal(f.rooms.startRound(f.code, "a1").ok, true);
  for (let i = 0; i < 5; i++) act(f, "a1", "correct");
  assert.deepEqual(f.state().game.scores, { A: 0, B: -5 });
  assert.match(f.state().recentEvents.at(-1)!.text, /Takım B -1$/);
  assert.equal(act(f, "a1", "pass").result.cardResult.scoreEffect, "0");
  assert.equal(act(f, "b1", "tabu").result.cardResult.scoreEffect, "Rakip +1");
  assert.deepEqual(f.state().game.scores, { A: 0, B: -4 });
  f.rooms.temporarilyDisconnectPlayer(f.code, "a1");
  f.rooms.removePlayer(f.code, "a1");
  assert.equal(f.state().game.activePowerUp, null);
  assert.equal(f.state().game.powerUps.A["attack-score"], false);
  assert.equal(f.state().game.completedRounds.A, 1);
});

test("consumed power-up cannot be reused in overtime while the other team keeps its copy", () => {
  const f = fixture();
  assert.equal(select(f, "a1", "double-score").ok, true);
  f.rooms.startRound(f.code, "a1");
  for (let i = 0; i < 5; i++) act(f, "a1", "correct");
  f.clock.advance(60_000);
  f.rooms.startRound(f.code, "b1");
  for (let i = 0; i < 10; i++) act(f, "b1", "correct");
  f.clock.advance(60_000);
  assert.equal(f.state().game.isOvertime, true);
  assert.deepEqual(select(f, "a2", "double-score"), { ok: false, error: "power-up-unavailable" });
  assert.equal(f.state().game.powerUps.B["double-score"], true);
  assert.equal(select(f, "a2", "attack-score").ok, true);
  f.rooms.startRound(f.code, "a2");
  for (let i = 0; i < 3; i++) act(f, "a2", "correct");
  assert.equal(f.state().game.scores.B, 7);
  f.clock.advance(60_000);
  assert.equal(f.state().game.winnerTeam, null);
  f.rooms.startRound(f.code, "b2");
  f.clock.advance(60_000);
  assert.equal(f.state().game.winnerTeam, "A");
});
