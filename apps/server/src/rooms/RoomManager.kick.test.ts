import assert from "node:assert/strict";
import test from "node:test";
import { FakeRoundClock } from "../game/FakeRoundClock.test-helper.js";
import { InMemoryCardHistoryStore } from "../cards/history/CardHistoryStore.js";
import { RoomManager } from "./RoomManager.js";

function fixture() {
  const clock = new FakeRoundClock();
  const rooms = new RoomManager(clock);
  const code = rooms.createRoom("host", "Host").code;
  rooms.joinRoom("a", "A", code);
  rooms.joinRoom("b", "B", code);
  return { rooms, clock, code };
}

test("only host can kick another lobby player; team and captain are cleared", () => {
  const { rooms, code } = fixture();
  assert.equal(rooms.movePlayer(code, "host", { playerId: "a", team: "A" }).ok, true);
  assert.equal(rooms.setCaptain(code, "host", { team: "A", captainId: "a" }).ok, true);
  assert.deepEqual(rooms.kickPlayer(code, "b", { playerId: "a" }), { ok: false, error: "not-host" });
  assert.deepEqual(rooms.kickPlayer(code, "host", { playerId: "host" }), { ok: false, error: "cannot-kick-self" });
  for (const payload of [{ playerId: "missing" }, { playerId: 4 }, { playerId: "a", extra: true }, null]) {
    assert.deepEqual(rooms.kickPlayer(code, "host", payload), { ok: false, error: "invalid-player" });
  }
  const otherCode = rooms.createRoom("outsider-host", "Other").code;
  rooms.joinRoom("other-player", "Other Player", otherCode);
  assert.deepEqual(rooms.kickPlayer(code, "host", { playerId: "other-player" }), { ok: false, error: "invalid-player" });
  assert.deepEqual(rooms.kickPlayer(code, "outsider", { playerId: "a" }), { ok: false, error: "not-in-room" });
  const kicked = rooms.kickPlayer(code, "host", { playerId: "a" });
  assert.equal(kicked.ok, true);
  if (!kicked.ok) return;
  assert.equal(kicked.room.players.some((player) => player.id === "a"), false);
  assert.equal(kicked.room.captainAId, null);
  assert.equal(rooms.hasPlayer(code, "a"), false);
  const rejoined = rooms.joinRoom("new-a", "A", code);
  assert.equal(rejoined.ok, true);
  if (rejoined.ok) assert.equal(rejoined.room.players.find((player) => player.id === "new-a")?.team, null);
});

test("kick leaves the room creator's card-history profile untouched", () => {
  const history = new InMemoryCardHistoryStore();
  history.recordSeen("profile", "card", 123);
  const rooms = new RoomManager(new FakeRoundClock(), history);
  const code = rooms.createRoom("host", "Host", "profile").code;
  rooms.joinRoom("guest", "Guest", code);
  assert.equal(rooms.kickPlayer(code, "host", { playerId: "guest" }).ok, true);
  assert.deepEqual(history.get("profile", "card"), { cardId: "card", lastSeenAt: 123, timesSeen: 1 });
});

test("kick frees a full room slot immediately", () => {
  const { rooms, code } = fixture();
  for (let index = 3; index <= 9; index += 1) assert.equal(rooms.joinRoom(`p${index}`, `P${index}`, code).ok, true);
  assert.equal(rooms.getRoomState(code)?.players.length, 10);
  assert.deepEqual(rooms.joinRoom("extra", "Extra", code), { ok: false, error: "room-full" });
  assert.equal(rooms.kickPlayer(code, "host", { playerId: "a" }).ok, true);
  assert.equal(rooms.getRoomState(code)?.players.length, 9);
  assert.equal(rooms.joinRoom("extra", "Extra", code).ok, true);
});

test("kick is forbidden in active game and game-over", () => {
  const { rooms, clock, code } = fixture();
  for (const [playerId, team] of [["host", "A"], ["a", "A"], ["b", "B"]] as const) {
    assert.equal(rooms.movePlayer(code, "host", { playerId, team }).ok, true);
  }
  rooms.setCaptain(code, "host", { team: "A", captainId: "a" });
  rooms.setCaptain(code, "host", { team: "B", captainId: "b" });
  rooms.updateSettings(code, "host", { setting: "targetScore", value: 10 });
  assert.equal(rooms.startGame(code, "host").ok, true);
  assert.deepEqual(rooms.kickPlayer(code, "host", { playerId: "a" }), { ok: false, error: "game-already-started" });
  rooms.startRound(code, "host");
  for (let index = 0; index < 10; index += 1) {
    const version = rooms.getPersonalGameView(code, "host")?.cardVersion;
    assert.ok(version);
    rooms.cardAction(code, "host", { action: "correct", cardVersion: version });
  }
  clock.advance(60_000);
  rooms.startRound(code, "b");
  clock.advance(60_000);
  assert.equal(rooms.getRoomState(code)?.game.phase, "game-over");
  assert.deepEqual(rooms.kickPlayer(code, "host", { playerId: "a" }), { ok: false, error: "game-already-started" });
});
