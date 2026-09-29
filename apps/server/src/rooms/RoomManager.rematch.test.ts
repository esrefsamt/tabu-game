import assert from "node:assert/strict";
import test from "node:test";
import type { RoomState } from "@tabu/shared";
import { FakeRoundClock } from "../game/FakeRoundClock.test-helper.js";
import { RoomManager } from "./RoomManager.js";

function fixture() {
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
  assert.equal(rooms.setCaptain(code, "a1", { team: "A", captainId: "a2" }).ok, true);
  assert.equal(rooms.setCaptain(code, "a1", { team: "B", captainId: "b1" }).ok, true);
  assert.equal(rooms.updateSettings(code, "a1", { setting: "roundDurationSeconds", value: 30 }).ok, true);
  assert.equal(rooms.updateSettings(code, "a1", { setting: "targetScore", value: 10 }).ok, true);
  return { rooms, code, clock, published };
}

function correctToWin(rooms: RoomManager, code: string, clueGiverId: string, drawnIds?: Set<string>) {
  let lastVersion = 0;
  for (let score = 1; score <= 10; score += 1) {
    const view = rooms.getPersonalGameView(code, clueGiverId)!;
    assert.ok(view.currentCard && view.cardVersion);
    drawnIds?.add(view.currentCard.id);
    lastVersion = view.cardVersion;
    const result = rooms.cardAction(code, clueGiverId, { action: "correct", cardVersion: lastVersion });
    assert.equal(result.ok, true);
    if (result.ok) assert.equal(result.room.game.scores.A, score);
  }
  return lastVersion;
}

test("only the current host can return a finished match to the lobby", () => {
  const { rooms, code } = fixture();
  assert.deepEqual(rooms.returnToLobby(code, "outsider"), { ok: false, error: "not-in-room" });
  assert.deepEqual(rooms.returnToLobby(code, "a1"), { ok: false, error: "game-not-over" });
  assert.equal(rooms.startGame(code, "a1").ok, true);
  assert.deepEqual(rooms.returnToLobby(code, "a1"), { ok: false, error: "game-not-over" });
  assert.equal(rooms.startRound(code, "a1").ok, true);
  assert.deepEqual(rooms.returnToLobby(code, "a1"), { ok: false, error: "game-not-over" });
  correctToWin(rooms, code, "a1");
  assert.deepEqual(rooms.returnToLobby(code, "b1"), { ok: false, error: "not-host" });
  const reset = rooms.returnToLobby(code, "a1");
  assert.equal(reset.ok, true);
  if (!reset.ok) return;
  assert.equal(reset.room.game.phase, "lobby");
  assert.equal(reset.room.game.winnerTeam, null);
  assert.deepEqual(reset.room.game.scores, { A: 0, B: 0 });
  assert.equal(reset.room.game.activeTeam, null);
  assert.equal(reset.room.game.clueGiverId, null);
  assert.equal(reset.room.game.error, null);
  assert.equal(reset.room.game.roundId, null);
  assert.equal(reset.room.game.roundEndsAt, null);
  assert.equal(reset.room.game.passesUsed, 0);
  assert.deepEqual(rooms.getPersonalGameView(code, "a1"), {
    roundId: null, cardVersion: null, currentCard: null
  });
  assert.deepEqual(rooms.returnToLobby(code, "a1"), { ok: false, error: "game-not-over" });
});

test("return keeps room members and settings, resets rotation, and rejects old card versions in match two", () => {
  const { rooms, code, clock, published } = fixture();
  assert.equal(rooms.startGame(code, "a1").ok, true);
  assert.equal(rooms.startRound(code, "a1").ok, true);
  const firstMatchCards = new Set<string>();
  firstMatchCards.add(rooms.getPersonalGameView(code, "a1")!.currentCard!.id);
  clock.advance(30_000);
  assert.equal(rooms.startRound(code, "b1").ok, true);
  firstMatchCards.add(rooms.getPersonalGameView(code, "b1")!.currentCard!.id);
  clock.advance(30_000);
  assert.equal(published.at(-1)?.game.activeTeam, "A");
  assert.equal(published.at(-1)?.game.clueGiverId, "a2");
  assert.equal(rooms.startRound(code, "a2").ok, true);

  const takeCurrentCard = () => {
    const view = rooms.getPersonalGameView(code, "a2")!;
    assert.ok(view.currentCard && view.cardVersion);
    assert.equal(firstMatchCards.has(view.currentCard.id), false);
    firstMatchCards.add(view.currentCard.id);
    return view.cardVersion;
  };
  assert.equal(rooms.cardAction(code, "a2", { action: "pass", cardVersion: takeCurrentCard() }).ok, true);
  assert.equal(rooms.cardAction(code, "b1", { action: "tabu", cardVersion: takeCurrentCard() }).ok, true);
  let winningVersion = 0;
  for (let index = 0; index < 11; index += 1) {
    winningVersion = takeCurrentCard();
    assert.equal(rooms.cardAction(code, "a2", { action: "correct", cardVersion: winningVersion }).ok, true);
  }
  assert.equal(firstMatchCards.size, 15);
  assert.equal(clock.activeTimerCount, 0);
  const reset = rooms.returnToLobby(code, "a1");
  assert.equal(reset.ok, true);
  if (!reset.ok) return;
  assert.equal(reset.room.code, code);
  assert.deepEqual(reset.room.players.map((player) => [player.id, player.team, player.isHost]), [
    ["a1", "A", true], ["a2", "A", false], ["b1", "B", false]
  ]);
  assert.equal(reset.room.captainAId, "a2");
  assert.equal(reset.room.captainBId, "b1");
  assert.deepEqual(reset.room.settings, { roundDurationSeconds: 30, passLimit: 3, targetScore: 10, cardSelection: { mode: "GENERAL" } });
  assert.deepEqual(reset.room.game.scores, { A: 0, B: 0 });
  assert.equal(reset.room.game.winnerTeam, null);
  assert.equal(reset.room.game.phase, "lobby");
  assert.equal(rooms.getPersonalGameView(code, "a2")?.currentCard, null);
  assert.deepEqual(rooms.cardAction(code, "a2", { action: "correct", cardVersion: winningVersion }), {
    ok: false, error: "round-not-active"
  });
  const publishedBefore = published.length;
  clock.advance(30_000);
  assert.equal(published.length, publishedBefore);

  const second = rooms.startGame(code, "a1");
  assert.equal(second.ok, true);
  if (!second.ok) return;
  assert.deepEqual(second.room.game.scores, { A: 0, B: 0 });
  assert.equal(second.room.game.activeTeam, "A");
  assert.equal(second.room.game.clueGiverId, "a1");
  assert.equal(rooms.startRound(code, "a1").ok, true);
  const secondView = rooms.getPersonalGameView(code, "a1")!;
  assert.ok(secondView.cardVersion! > winningVersion);
  assert.deepEqual(rooms.cardAction(code, "a1", { action: "correct", cardVersion: winningVersion }), {
    ok: false, error: "stale-card"
  });
  assert.equal(rooms.getPersonalGameView(code, "a2")?.currentCard, null);
  assert.equal(rooms.getPersonalGameView(code, "b1")?.currentCard?.id, secondView.currentCard?.id);
  const secondMatchCards = new Set<string>();
  for (let score = 1; score <= 10; score += 1) {
    const view = rooms.getPersonalGameView(code, "a1")!;
    assert.ok(view.currentCard && view.cardVersion);
    assert.equal(firstMatchCards.has(view.currentCard.id), false);
    secondMatchCards.add(view.currentCard.id);
    assert.equal(rooms.cardAction(code, "a1", { action: "correct", cardVersion: view.cardVersion }).ok, true);
  }
  assert.equal(secondMatchCards.size, 10);
  const publicState = second.room;
  assert.equal(JSON.stringify(publicState).includes("lastCardVersion"), false);
  assert.equal(JSON.stringify(publicState).includes("usedCardIds"), false);
  assert.equal(JSON.stringify(publicState).includes("remainingCardIds"), false);
  assert.equal(JSON.stringify(rooms.getPersonalGameView(code, "a1")).includes("usedCardIds"), false);
});

test("new host can return to lobby after winner-screen host transfer and prepare another match", () => {
  const { rooms, code } = fixture();
  assert.equal(rooms.startGame(code, "a1").ok, true);
  assert.equal(rooms.startRound(code, "a1").ok, true);
  correctToWin(rooms, code, "a1");
  assert.deepEqual(rooms.joinRoom("late", "Late", code), { ok: false, error: "game-already-started" });
  const afterDisconnect = rooms.removePlayer(code, "a1");
  assert.equal(afterDisconnect?.players.find((player) => player.id === "a2")?.isHost, true);
  assert.equal(afterDisconnect?.game.winnerTeam, "A");
  assert.deepEqual(rooms.returnToLobby(code, "a1"), { ok: false, error: "not-in-room" });
  assert.deepEqual(rooms.returnToLobby(code, "b1"), { ok: false, error: "not-host" });
  const reset = rooms.returnToLobby(code, "a2");
  assert.equal(reset.ok, true);
  if (!reset.ok) return;
  assert.equal(reset.room.captainAId, "a2");
  assert.equal(reset.room.captainBId, "b1");
  assert.equal(rooms.joinRoom("new", "New", code).ok, true);
  const joined = rooms.joinRoom("extra", "Extra", code);
  assert.equal(joined.ok, true);
  if (joined.ok) assert.equal(joined.room.players.find((player) => player.id === "extra")?.team, null);
  assert.deepEqual(rooms.startGame(code, "a2"), { ok: false, error: "players-unassigned" });
  assert.equal(rooms.movePlayer(code, "a2", { playerId: "new", team: "B" }).ok, true);
  assert.equal(rooms.movePlayer(code, "a2", { playerId: "extra", team: "A" }).ok, true);
  assert.equal(rooms.setCaptain(code, "a2", { team: "A", captainId: "extra" }).ok, true);
  assert.equal(rooms.updateSettings(code, "a2", { setting: "targetScore", value: 15 }).ok, true);
  const second = rooms.startGame(code, "a2");
  assert.equal(second.ok, true);
  if (second.ok) {
    assert.deepEqual(second.room.game.scores, { A: 0, B: 0 });
    assert.equal(second.room.game.activeTeam, "A");
    assert.equal(second.room.game.clueGiverId, "a2");
    assert.equal(second.room.settings.targetScore, 15);
  }
});

test("a disconnected captain is cleared before the new host prepares a rematch", () => {
  const { rooms, code } = fixture();
  assert.equal(rooms.setCaptain(code, "a1", { team: "A", captainId: "a1" }).ok, true);
  assert.equal(rooms.startGame(code, "a1").ok, true);
  assert.equal(rooms.startRound(code, "a1").ok, true);
  correctToWin(rooms, code, "a1");
  assert.equal(rooms.removePlayer(code, "a1")?.captainAId, null);
  const reset = rooms.returnToLobby(code, "a2");
  assert.equal(reset.ok, true);
  if (!reset.ok) return;
  assert.equal(reset.room.captainAId, null);
  assert.equal(reset.room.captainBId, "b1");
  assert.deepEqual(rooms.startGame(code, "a2"), { ok: false, error: "captains-required" });
  assert.equal(rooms.setCaptain(code, "a2", { team: "A", captainId: "a2" }).ok, true);
  assert.equal(rooms.startGame(code, "a2").ok, true);
});

test("a room deck preserves card progress across consecutive rematches", () => {
  const { rooms, code } = fixture();
  const seen = new Set<string>();
  let previousFinalId = "";
  for (let match = 1; match <= 5; match += 1) {
    assert.equal(rooms.startGame(code, "a1").ok, true);
    assert.equal(rooms.startRound(code, "a1").ok, true);
    for (let score = 1; score <= 10; score += 1) {
      const view = rooms.getPersonalGameView(code, "a1")!;
      assert.ok(view.currentCard && view.cardVersion);
      const cardId = view.currentCard.id;
      assert.equal(seen.has(cardId), false);
      seen.add(cardId);
      previousFinalId = cardId;
      assert.equal(rooms.cardAction(code, "a1", { action: "correct", cardVersion: view.cardVersion }).ok, true);
    }
    assert.equal(seen.size, match * 10);
    const reset = rooms.returnToLobby(code, "a1");
    assert.equal(reset.ok, true);
  }
  assert.equal(seen.size, 50);
  assert.equal(rooms.startGame(code, "a1").ok, true);
  assert.equal(rooms.startRound(code, "a1").ok, true);
  const newCycleCard = rooms.getPersonalGameView(code, "a1")?.currentCard;
  assert.ok(newCycleCard);
  assert.equal(seen.has(newCycleCard.id), false);
  assert.notEqual(newCycleCard.id, previousFinalId);
});
