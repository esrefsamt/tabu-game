import assert from "node:assert/strict";
import test from "node:test";
import { RoomManager } from "./RoomManager.js";

test("room state keeps Phase 4 lobby features and never includes private deck state", () => {
  const rooms = new RoomManager();
  const created = rooms.createRoom("host", "Kerim");
  const roomCode = created.code;

  assert.equal(created.settings.roundDurationSeconds, 60);
  assert.equal(created.settings.passLimit, 3);
  assert.equal(created.settings.targetScore, 30);
  assert.equal(created.captainAId, null);
  assert.equal(created.captainBId, null);
  assert.equal(Object.hasOwn(created, "deck"), false);
  assert.equal(Object.hasOwn(created, "cards"), false);
  assert.deepEqual(created.game, {
    phase: "lobby",
    winnerTeam: null,
    activeTeam: null,
    clueGiverId: null,
    error: null,
    scores: { A: 0, B: 0 },
    completedRounds: { A: 0, B: 0 },
    isOvertime: false,
    roundId: null,
    roundEndsAt: null,
    roundPausedRemainingMs: null,
    passesUsed: 0,
    tabuCooldownUntil: null,
    powerUps: { A: { "double-score": true, "attack-score": true }, B: { "double-score": true, "attack-score": true } },
    selectedPowerUp: null,
    activePowerUp: null
  });

  const joined = rooms.joinRoom("guest", "Misafir", roomCode);
  assert.equal(joined.ok, true);
  if (!joined.ok) return;

  assert.equal(rooms.movePlayer(roomCode, "host", { playerId: "host", team: "A" }).ok, true);
  assert.equal(rooms.movePlayer(roomCode, "host", { playerId: "guest", team: "B" }).ok, true);
  assert.equal(rooms.setCaptain(roomCode, "host", { team: "A", captainId: "host" }).ok, true);
  assert.equal(rooms.setCaptain(roomCode, "host", { team: "B", captainId: "guest" }).ok, true);
  assert.equal(
    rooms.updateSettings(roomCode, "host", { setting: "roundDurationSeconds", value: 90 }).ok,
    true
  );
  assert.equal(rooms.updateSettings(roomCode, "host", { setting: "passLimit", value: 5 }).ok, true);

  const switched = rooms.movePlayer(roomCode, "host", { playerId: "guest", team: "A" });
  assert.equal(switched.ok, true);
  if (switched.ok) {
    assert.equal(switched.room.captainBId, null);
    assert.equal(switched.room.settings.roundDurationSeconds, 90);
    assert.equal(switched.room.settings.passLimit, 5);
    assert.equal(switched.room.players.find((player) => player.id === "host")?.isHost, true);
  }

  const afterHostDisconnect = rooms.removePlayer(roomCode, "host");
  assert.ok(afterHostDisconnect);
  assert.equal(afterHostDisconnect?.players.find((player) => player.id === "guest")?.isHost, true);
  assert.equal(afterHostDisconnect?.captainAId, null);
  assert.equal(afterHostDisconnect?.settings.roundDurationSeconds, 90);
  assert.equal(afterHostDisconnect?.settings.passLimit, 5);
  assert.equal(rooms.removePlayer(roomCode, "guest"), null);
});

function createStartableRoom(): { rooms: RoomManager; code: string } {
  const rooms = new RoomManager();
  const room = rooms.createRoom("host", "Host");
  const joined = rooms.joinRoom("guest", "Guest", room.code);
  assert.equal(joined.ok, true);
  assert.equal(rooms.movePlayer(room.code, "host", { playerId: "host", team: "A" }).ok, true);
  assert.equal(rooms.movePlayer(room.code, "host", { playerId: "guest", team: "B" }).ok, true);
  assert.equal(rooms.setCaptain(room.code, "host", { team: "A", captainId: "host" }).ok, true);
  assert.equal(rooms.setCaptain(room.code, "host", { team: "B", captainId: "guest" }).ok, true);
  return { rooms, code: room.code };
}

test("host can start a valid game with Team A and its captain first", () => {
  const { rooms, code } = createStartableRoom();
  const result = rooms.startGame(code, "host");

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.room.game.phase, "turn-preparation");
    assert.equal(result.room.game.activeTeam, "A");
    assert.equal(result.room.game.clueGiverId, "host");
    assert.equal(result.room.captainAId, result.room.game.clueGiverId);
    assert.equal(Object.hasOwn(result.room, "deck"), false);
    assert.equal(Object.hasOwn(result.room, "cards"), false);
  }
});

test("a non-host cannot start the game", () => {
  const { rooms, code } = createStartableRoom();
  assert.deepEqual(rooms.startGame(code, "guest"), { ok: false, error: "not-host" });
});

test("a game cannot start with fewer than two players", () => {
  const rooms = new RoomManager();
  const room = rooms.createRoom("host", "Host");
  assert.deepEqual(rooms.startGame(room.code, "host"), { ok: false, error: "not-enough-players" });
});

test("a game cannot start with an empty team", () => {
  const rooms = new RoomManager();
  const room = rooms.createRoom("host", "Host");
  assert.equal(rooms.joinRoom("guest", "Guest", room.code).ok, true);
  assert.equal(rooms.movePlayer(room.code, "host", { playerId: "host", team: "A" }).ok, true);
  assert.deepEqual(rooms.startGame(room.code, "host"), { ok: false, error: "teams-incomplete" });
});

test("a game cannot start without both team captains", () => {
  const rooms = new RoomManager();
  const room = rooms.createRoom("host", "Host");
  assert.equal(rooms.joinRoom("guest", "Guest", room.code).ok, true);
  assert.equal(rooms.movePlayer(room.code, "host", { playerId: "host", team: "A" }).ok, true);
  assert.equal(rooms.movePlayer(room.code, "host", { playerId: "guest", team: "B" }).ok, true);
  assert.deepEqual(rooms.startGame(room.code, "host"), { ok: false, error: "captains-required" });
});

test("a game cannot start while any player is unassigned", () => {
  const { rooms, code } = createStartableRoom();
  assert.equal(rooms.joinRoom("unassigned", "Unassigned", code).ok, true);
  assert.deepEqual(rooms.startGame(code, "host"), { ok: false, error: "players-unassigned" });
});

test("team, captain, and settings changes are rejected after game start", () => {
  const { rooms, code } = createStartableRoom();
  assert.equal(rooms.startGame(code, "host").ok, true);
  assert.deepEqual(rooms.movePlayer(code, "host", { playerId: "host", team: "B" }), {
    ok: false,
    error: "game-already-started"
  });
  assert.deepEqual(rooms.setCaptain(code, "host", { team: "A", captainId: "guest" }), {
    ok: false,
    error: "game-already-started"
  });
  assert.deepEqual(rooms.updateSettings(code, "host", { setting: "passLimit", value: 5 }), {
    ok: false,
    error: "game-already-started"
  });
  assert.deepEqual(rooms.startGame(code, "host"), { ok: false, error: "game-already-started" });
});

test("new joins are rejected after game start", () => {
  const { rooms, code } = createStartableRoom();
  assert.equal(rooms.startGame(code, "host").ok, true);
  assert.deepEqual(rooms.joinRoom("late", "Late", code), {
    ok: false,
    error: "game-already-started"
  });
});

test("host transfer during a game does not change the turn order", () => {
  const rooms = new RoomManager();
  const room = rooms.createRoom("old-host", "Old Host");
  assert.equal(rooms.joinRoom("team-b", "Team B", room.code).ok, true);
  assert.equal(rooms.joinRoom("team-a", "Team A", room.code).ok, true);
  assert.equal(rooms.movePlayer(room.code, "old-host", { playerId: "old-host", team: "B" }).ok, true);
  assert.equal(rooms.movePlayer(room.code, "old-host", { playerId: "team-a", team: "A" }).ok, true);
  assert.equal(rooms.movePlayer(room.code, "old-host", { playerId: "team-b", team: "B" }).ok, true);
  assert.equal(rooms.setCaptain(room.code, "old-host", { team: "A", captainId: "team-a" }).ok, true);
  assert.equal(rooms.setCaptain(room.code, "old-host", { team: "B", captainId: "team-b" }).ok, true);
  assert.equal(rooms.startGame(room.code, "old-host").ok, true);

  const afterDisconnect = rooms.removePlayer(room.code, "old-host");
  assert.equal(afterDisconnect?.players.find((player) => player.id === "team-b")?.isHost, true);
  assert.equal(afterDisconnect?.game.activeTeam, "A");
  assert.equal(afterDisconnect?.game.clueGiverId, "team-a");
  assert.equal(afterDisconnect?.game.phase, "turn-preparation");
});

test("room manager preserves the ten-player limit", () => {
  const rooms = new RoomManager();
  const room = rooms.createRoom("player-1", "Oyuncu 1");

  for (let index = 2; index <= 10; index += 1) {
    const joined = rooms.joinRoom(`player-${index}`, `Oyuncu ${index}`, room.code);
    assert.equal(joined.ok, true);
  }

  assert.deepEqual(rooms.joinRoom("player-11", "Oyuncu 11", room.code), {
    ok: false,
    error: "room-full"
  });
});
