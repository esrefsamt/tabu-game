import assert from "node:assert/strict";
import test from "node:test";
import { cardsForSelection } from "../cards/playerCategories.js";
import { FakeRoundClock } from "../game/FakeRoundClock.test-helper.js";
import { RoomManager } from "./RoomManager.js";

function fixture() {
  const clock = new FakeRoundClock();
  const rooms = new RoomManager(clock);
  const code = rooms.createRoom("a", "A").code;
  assert.equal(rooms.joinRoom("b", "B", code).ok, true);
  assert.equal(rooms.movePlayer(code, "a", { playerId: "a", team: "A" }).ok, true);
  assert.equal(rooms.movePlayer(code, "a", { playerId: "b", team: "B" }).ok, true);
  assert.equal(rooms.setCaptain(code, "a", { team: "A", captainId: "a" }).ok, true);
  assert.equal(rooms.setCaptain(code, "a", { team: "B", captainId: "b" }).ok, true);
  return { rooms, code, clock };
}

test("GENERAL defaults to every card and exposes no deck details", () => {
  const { rooms, code } = fixture();
  const state = rooms.joinRoom("b", "B", code);
  assert.equal(state.ok, true);
  if (!state.ok) return;
  assert.deepEqual(state.room.settings.cardSelection, { mode: "GENERAL" });
  assert.equal(cardsForSelection(state.room.settings.cardSelection).length, 2977);
  assert.equal(JSON.stringify(state.room).includes("usedCardIds"), false);
  assert.equal(JSON.stringify(state.room).includes("eligibleCards"), false);
  assert.equal(JSON.stringify(state.room).includes("forbiddenWords"), false);
});

test("only lobby host can set valid categories and cannot mutate returned state", () => {
  const { rooms, code } = fixture();
  const payload = { setting: "cardSelection", value: { mode: "CUSTOM", categories: ["FOOD", "SPORTS"] } };
  assert.deepEqual(rooms.updateSettings(code, "outsider", payload), { ok: false, error: "not-in-room" });
  assert.deepEqual(rooms.updateSettings(code, "b", payload), { ok: false, error: "not-host" });
  for (const value of [{ mode: "CUSTOM", categories: [] }, { mode: "CUSTOM", categories: ["FOOD", "FOOD"] }, { mode: "CUSTOM", categories: ["BAD"] }, { mode: "GENERAL", categories: ["FOOD"] }]) {
    assert.deepEqual(rooms.updateSettings(code, "a", { setting: "cardSelection", value }), { ok: false, error: "invalid-settings" });
  }
  const changed = rooms.updateSettings(code, "a", payload);
  assert.equal(changed.ok, true);
  if (!changed.ok || changed.room.settings.cardSelection.mode !== "CUSTOM") return;
  changed.room.settings.cardSelection.categories.push("TECH");
  const start = rooms.startGame(code, "a");
  assert.equal(start.ok, true);
  if (!start.ok) return;
  assert.deepEqual(start.room.settings.cardSelection, { mode: "CUSTOM", categories: ["FOOD", "SPORTS"] });
  assert.deepEqual(rooms.updateSettings(code, "a", payload), { ok: false, error: "game-already-started" });
});

test("real round draws only selected groups and keeps selection after match", () => {
  const { rooms, code, clock } = fixture();
  const selection = { mode: "CUSTOM" as const, categories: ["FOOD" as const] };
  assert.equal(rooms.updateSettings(code, "a", { setting: "cardSelection", value: selection }).ok, true);
  const foodIds = new Set(cardsForSelection(selection).map((card) => card.id));
  assert.equal(rooms.startGame(code, "a").ok, true);
  assert.equal(rooms.startRound(code, "a").ok, true);
  const used = new Set<string>();
  for (let i = 0; i < 30; i += 1) {
    const view = rooms.getPersonalGameView(code, "a")!;
    assert.ok(view.currentCard && view.cardVersion);
    assert.equal(foodIds.has(view.currentCard.id), true);
    assert.equal(used.has(view.currentCard.id), false);
    used.add(view.currentCard.id);
    assert.equal(rooms.getPersonalGameView(code, "b")?.currentCard?.id, view.currentCard.id);
    assert.equal(rooms.cardAction(code, "a", { action: "correct", cardVersion: view.cardVersion }).ok, true);
  }
  clock.advance(60_000);
  assert.equal(rooms.startRound(code, "b").ok, true);
  clock.advance(60_000);
  const result = rooms.returnToLobby(code, "a");
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.room.settings.cardSelection, selection);
  assert.equal(rooms.updateSettings(code, "a", { setting: "cardSelection", value: { mode: "GENERAL" } }).ok, true);
  assert.equal(rooms.updateSettings(code, "a", { setting: "cardSelection", value: selection }).ok, true);
  assert.equal(rooms.startGame(code, "a").ok, true);
  assert.equal(rooms.startRound(code, "a").ok, true);
  assert.equal(used.has(rooms.getPersonalGameView(code, "a")?.currentCard?.id ?? ""), false);
  rooms.removePlayer(code, "a");
  rooms.removePlayer(code, "b");
});
