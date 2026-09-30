import assert from "node:assert/strict";
import test from "node:test";
import { FakeRoundClock } from "../game/FakeRoundClock.test-helper.js";
import { RoomManager } from "./RoomManager.js";

function fixture() {
  const clock = new FakeRoundClock();
  const rooms = new RoomManager(clock);
  const code = rooms.createRoom("a1", "A1").code;
  for (const id of ["a2", "b1", "b2"]) assert.equal(rooms.joinRoom(id, id.toUpperCase(), code).ok, true);
  for (const [id, team] of [["a1", "A"], ["a2", "A"], ["b1", "B"], ["b2", "B"]] as const) {
    assert.equal(rooms.movePlayer(code, "a1", { playerId: id, team }).ok, true);
  }
  assert.equal(rooms.setCaptain(code, "a1", { team: "A", captainId: "a1" }).ok, true);
  assert.equal(rooms.setCaptain(code, "a1", { team: "B", captainId: "b1" }).ok, true);
  assert.equal(rooms.updateSettings(code, "a1", { setting: "targetScore", value: 10 }).ok, true);
  return { rooms, clock, code };
}

function act(rooms: RoomManager, code: string, playerId: string, action: "correct" | "pass" | "tabu") {
  const view = rooms.getPersonalGameView(code, playerId)!;
  assert.ok(view.cardVersion);
  assert.ok(view.currentCard);
  const result = rooms.cardAction(code, playerId, { action, cardVersion: view.cardVersion });
  assert.equal(result.ok, true);
  return { view, result };
}

function winForA(rooms: RoomManager, clock: FakeRoundClock, code: string) {
  assert.equal(rooms.startGame(code, "a1").ok, true);
  assert.equal(rooms.startRound(code, "a1").ok, true);
  for (let index = 0; index < 10; index += 1) act(rooms, code, "a1", "correct");
  clock.advance(60_000);
  assert.equal(rooms.startRound(code, "b1").ok, true);
  clock.advance(60_000);
  assert.equal(rooms.getRoomState(code)?.game.winnerTeam, "A");
}

test("authoritative history logs only accepted, consumed words and survives reconnect", () => {
  const { rooms, code, clock } = fixture();
  rooms.startGame(code, "a1");
  rooms.startRound(code, "a1");
  assert.match(rooms.getRoomState(code)!.recentEvents[0]!.text, /Sıra A takımında/);
  const hidden = rooms.getPersonalGameView(code, "a2")!;
  assert.equal(hidden.currentCard, null);
  assert.equal(hidden.cardVersion, null);
  const first = act(rooms, code, "a1", "correct");
  assert.equal(rooms.getRoomState(code)!.recentEvents.at(-1)!.text.includes(first.view.currentCard!.word), true);
  assert.equal(rooms.getRoomState(code)!.recentEvents.at(-1)!.type, "correct");
  const second = act(rooms, code, "a1", "pass");
  assert.equal(rooms.getRoomState(code)!.recentEvents.at(-1)!.text.includes(second.view.currentCard!.word), true);
  const third = act(rooms, code, "b1", "tabu");
  const state = rooms.getRoomState(code)!;
  assert.equal(state.recentEvents.at(-1)!.type, "tabu");
  assert.equal(state.recentEvents.at(-1)!.text.includes(third.view.currentCard!.word), true);
  assert.equal(state.recentEvents.some((event) => event.text.includes(rooms.getPersonalGameView(code, "a1")!.currentCard!.word)), false);
  for (const [index, action] of [first, second, third].entries()) {
    const entry = state.recentEvents[index + 1]!;
    assert.deepEqual(Object.keys(entry).sort(), ["id", "occurredAt", "text", "type"]);
    for (const forbidden of action.view.currentCard!.forbiddenWords) {
      assert.equal(entry.text.includes(forbidden), false);
    }
  }
  const oldLength = state.recentEvents.length;
  assert.deepEqual(rooms.cardAction(code, "a2", { action: "correct", cardVersion: 1 }), { ok: false, error: "not-authorized" });
  assert.equal(rooms.getRoomState(code)!.recentEvents.length, oldLength);
  assert.equal(rooms.temporarilyDisconnectPlayer(code, "a1")?.recentEvents.at(-1)?.type, "round-paused");
  clock.advance(500);
  assert.equal(rooms.reconnectPlayer(code, "a1")?.recentEvents.at(-1)?.type, "round-resumed");
  assert.deepEqual(rooms.getRoomState(code)?.recentEvents, rooms.reconnectPlayer(code, "a2")?.recentEvents);
});

test("history is capped at thirty entries and rematch clears actions", () => {
  const { rooms, clock, code } = fixture();
  rooms.startGame(code, "a1");
  rooms.startRound(code, "a1");
  for (let index = 0; index < 38; index += 1) act(rooms, code, "a1", "correct");
  const state = rooms.getRoomState(code)!;
  assert.equal(state.recentEvents.length, 30);
  assert.equal(state.recentEvents[0]!.id, 10);
  clock.advance(60_000);
  assert.equal(rooms.startRound(code, "b1").ok, true);
  clock.advance(60_000);
  assert.equal(rooms.getRoomState(code)?.game.winnerTeam, "A");
  assert.equal(rooms.getRoomState(code)?.recentEvents.at(-1)?.type, "match-win");
  assert.equal(rooms.returnToLobby(code, "a1").ok, true);
  assert.deepEqual(rooms.getRoomState(code)?.recentEvents, []);
});

test("Tabu cooldown rejects a fresh-card attempt from either captain, while Correct remains available", () => {
  const { rooms, clock, code } = fixture();
  rooms.startGame(code, "a1");
  rooms.startRound(code, "a1");
  const version = rooms.getPersonalGameView(code, "b1")!.cardVersion!;
  assert.equal(rooms.cardAction(code, "b1", { action: "tabu", cardVersion: version }).ok, true);
  const nextVersion = rooms.getPersonalGameView(code, "a1")!.cardVersion!;
  const count = rooms.getRoomState(code)!.recentEvents.length;
  assert.deepEqual(rooms.cardAction(code, "a1", { action: "tabu", cardVersion: version }), { ok: false, error: "stale-card" });
  assert.deepEqual(rooms.cardAction(code, "a1", { action: "tabu", cardVersion: nextVersion }), { ok: false, error: "tabu-cooldown" });
  assert.deepEqual(rooms.cardAction(code, "b1", { action: "tabu", cardVersion: nextVersion }), { ok: false, error: "tabu-cooldown" });
  assert.equal(rooms.getRoomState(code)!.recentEvents.length, count);
  assert.equal(rooms.getRoomState(code)!.game.scores.A, -1);
  assert.equal(rooms.getRoomState(code)!.game.tabuCooldownUntil, clock.now() + 1200);
  act(rooms, code, "a1", "correct");
  clock.advance(1200);
  act(rooms, code, "b1", "tabu");
  assert.equal(rooms.getRoomState(code)!.game.scores.A, -1);
});

test("room wins belong to players through rematch, team changes and reconnect, then reset on new identity", () => {
  const { rooms, clock, code } = fixture();
  assert.deepEqual(rooms.getRoomState(code)!.players.map((player) => player.roomWins), [0, 0, 0, 0]);
  winForA(rooms, clock, code);
  let wins = Object.fromEntries(rooms.getRoomState(code)!.players.map((player) => [player.id, player.roomWins]));
  assert.deepEqual(wins, { a1: 1, a2: 1, b1: 0, b2: 0 });
  clock.advance(120_000);
  assert.equal(rooms.getRoomState(code)!.players.find((player) => player.id === "a1")?.roomWins, 1);
  assert.equal(rooms.reconnectPlayer(code, "a2")?.players.find((player) => player.id === "a2")?.roomWins, 1);
  assert.equal(rooms.returnToLobby(code, "a1").ok, true);
  rooms.movePlayer(code, "a1", { playerId: "a2", team: "B" });
  rooms.movePlayer(code, "a1", { playerId: "b2", team: "A" });
  assert.equal(rooms.startGame(code, "a1").ok, true);
  rooms.startRound(code, "a1");
  clock.advance(60_000);
  assert.equal(rooms.startRound(code, "a2").ok, true);
  for (let index = 0; index < 10; index += 1) act(rooms, code, "a2", "correct");
  clock.advance(60_000);
  wins = Object.fromEntries(rooms.getRoomState(code)!.players.map((player) => [player.id, player.roomWins]));
  assert.deepEqual(wins, { a1: 1, a2: 2, b1: 1, b2: 0 });
  assert.equal(rooms.returnToLobby(code, "a1").ok, true);
  assert.equal(rooms.kickPlayer(code, "a1", { playerId: "a2" }).ok, true);
  assert.equal(rooms.joinRoom("new-a2", "A2", code).ok, true);
  assert.equal(rooms.getRoomState(code)!.players.find((player) => player.id === "new-a2")?.roomWins, 0);
  for (const id of ["a1", "b1", "b2", "new-a2"]) rooms.removePlayer(code, id);
  assert.equal(rooms.hasRoom(code), false);
  assert.equal(rooms.createRoom("a1", "A1").players[0]?.roomWins, 0);
});
