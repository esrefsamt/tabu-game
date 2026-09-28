import assert from "node:assert/strict";
import test from "node:test";
import { TurnEngine } from "./TurnEngine.js";

test("Team A starts with the first player in room order", () => {
  const turns = new TurnEngine(["samet", "kerim", "ahmet"], ["mehmet", "can"]);
  assert.deepEqual(turns.publicState, {
    phase: "turn-preparation",
    activeTeam: "A",
    clueGiverId: "samet",
    error: null
  });
});

test("turns alternate A, B, A, B", () => {
  const turns = new TurnEngine(["a1", "a2"], ["b1", "b2"]);
  assert.equal(turns.advanceTurn().activeTeam, "B");
  assert.equal(turns.advanceTurn().activeTeam, "A");
  assert.equal(turns.advanceTurn().activeTeam, "B");
  assert.equal(turns.advanceTurn().activeTeam, "A");
});

test("Team A clue-giver rotation advances independently and wraps", () => {
  const turns = new TurnEngine(["samet", "kerim", "ahmet"], ["mehmet"]);
  assert.equal(turns.publicState.clueGiverId, "samet");
  turns.advanceTurn();
  turns.advanceTurn();
  assert.equal(turns.publicState.clueGiverId, "kerim");
  turns.advanceTurn();
  turns.advanceTurn();
  assert.equal(turns.publicState.clueGiverId, "ahmet");
  turns.advanceTurn();
  turns.advanceTurn();
  assert.equal(turns.publicState.clueGiverId, "samet");
});

test("Team B clue-giver rotation advances independently", () => {
  const turns = new TurnEngine(["a1"], ["b1", "b2", "b3"]);
  turns.advanceTurn();
  assert.equal(turns.publicState.clueGiverId, "b1");
  turns.advanceTurn();
  turns.advanceTurn();
  assert.equal(turns.publicState.clueGiverId, "b2");
  turns.advanceTurn();
  turns.advanceTurn();
  assert.equal(turns.publicState.clueGiverId, "b3");
});

test("a disconnected non-current player is removed from future rotation", () => {
  const turns = new TurnEngine(["a1", "a2", "a3"], ["b1"]);
  turns.removePlayer("a2");
  turns.advanceTurn();
  turns.advanceTurn();
  assert.equal(turns.publicState.clueGiverId, "a3");
});

test("disconnecting the active clue giver selects the next teammate", () => {
  const turns = new TurnEngine(["a1", "a2"], ["b1"]);
  assert.equal(turns.publicState.clueGiverId, "a1");
  assert.equal(turns.removePlayer("a1").clueGiverId, "a2");
  assert.equal(turns.publicState.phase, "turn-preparation");
});

test("a team becoming empty marks the game unable to continue", () => {
  const turns = new TurnEngine(["a1"], ["b1"]);
  assert.deepEqual(turns.removePlayer("a1"), {
    phase: "unable-to-continue",
    activeTeam: "A",
    clueGiverId: null,
    error: "team-empty"
  });
  assert.equal(turns.advanceTurn().phase, "unable-to-continue");
});
