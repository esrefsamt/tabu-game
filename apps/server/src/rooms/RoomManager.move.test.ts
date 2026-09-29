import assert from "node:assert/strict";
import test from "node:test";
import { RoomManager } from "./RoomManager.js";

function lobby() {
  const rooms = new RoomManager();
  const code = rooms.createRoom("host", "Host").code;
  const joined = rooms.joinRoom("guest", "Guest", code);
  assert.equal(joined.ok, true);
  return { rooms, code, joined };
}

test("new players are unassigned and guests cannot move themselves or others", () => {
  const { rooms, code, joined } = lobby();
  if (!joined.ok) return;
  assert.equal(joined.room.players.find((player) => player.id === "guest")?.team, null);
  assert.deepEqual(rooms.movePlayer(code, "guest", { playerId: "guest", team: "A" }), {
    ok: false, error: "not-host"
  });
  assert.deepEqual(rooms.movePlayer(code, "guest", { playerId: "host", team: "B" }), {
    ok: false, error: "not-host"
  });
  assert.deepEqual(rooms.movePlayer(code, "outsider", { playerId: "guest", team: "A" }), {
    ok: false, error: "not-in-room"
  });
  assert.equal(joined.room.players.find((player) => player.id === "guest")?.team, null);
});

test("host moves players between both teams and unassigned, clearing old captain roles", () => {
  const { rooms, code } = lobby();
  const toA = rooms.movePlayer(code, "host", { playerId: "guest", team: "A" });
  assert.equal(toA.ok, true);
  if (!toA.ok) return;
  assert.equal(toA.room.players.find((player) => player.id === "guest")?.team, "A");
  assert.equal(rooms.setCaptain(code, "host", { team: "A", captainId: "guest" }).ok, true);

  const toB = rooms.movePlayer(code, "host", { playerId: "guest", team: "B" });
  assert.equal(toB.ok, true);
  if (!toB.ok) return;
  assert.equal(toB.room.players.find((player) => player.id === "guest")?.team, "B");
  assert.equal(toB.room.captainAId, null);
  assert.equal(toB.room.captainBId, null);
  assert.equal(rooms.setCaptain(code, "host", { team: "B", captainId: "guest" }).ok, true);

  const unassigned = rooms.movePlayer(code, "host", { playerId: "guest", team: null });
  assert.equal(unassigned.ok, true);
  if (!unassigned.ok) return;
  assert.equal(unassigned.room.players.find((player) => player.id === "guest")?.team, null);
  assert.equal(unassigned.room.captainBId, null);
});

test("move validation rejects missing players, invalid teams, and malformed payloads", () => {
  const { rooms, code } = lobby();
  assert.deepEqual(rooms.movePlayer(code, "host", { playerId: "missing", team: "A" }), {
    ok: false, error: "invalid-player"
  });
  assert.deepEqual(rooms.movePlayer(code, "host", { playerId: "guest", team: "C" }), {
    ok: false, error: "invalid-team"
  });
  assert.deepEqual(rooms.movePlayer(code, "host", { playerId: "guest", team: "A", extra: true }), {
    ok: false, error: "invalid-player"
  });
  assert.deepEqual(rooms.movePlayer(code, "host", { playerId: 42, team: "A" }), {
    ok: false, error: "invalid-player"
  });
});

test("host cannot move players after a valid game starts", () => {
  const { rooms, code } = lobby();
  assert.equal(rooms.movePlayer(code, "host", { playerId: "host", team: "A" }).ok, true);
  assert.equal(rooms.movePlayer(code, "host", { playerId: "guest", team: "B" }).ok, true);
  assert.equal(rooms.setCaptain(code, "host", { team: "A", captainId: "host" }).ok, true);
  assert.equal(rooms.setCaptain(code, "host", { team: "B", captainId: "guest" }).ok, true);
  assert.equal(rooms.startGame(code, "host").ok, true);
  assert.deepEqual(rooms.movePlayer(code, "host", { playerId: "guest", team: null }), {
    ok: false, error: "game-already-started"
  });
});
