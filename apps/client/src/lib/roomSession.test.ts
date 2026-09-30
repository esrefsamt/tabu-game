import assert from "node:assert/strict";
import test from "node:test";
import { clearRoomSession, loadRoomSession, saveRoomSession, type RoomSessionStorage } from "./roomSession";

const session = {
  roomCode: "ABC234",
  playerId: "stable-player-id",
  sessionToken: "a".repeat(64)
};

function memoryStorage(): RoomSessionStorage {
  const values = new Map<string, string>();
  return {
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) { values.set(key, value); },
    removeItem(key) { values.delete(key); }
  };
}

test("room session survives a reload through local storage and remains room scoped", () => {
  const storage = memoryStorage();
  saveRoomSession(session, storage);
  assert.deepEqual(loadRoomSession("ABC234", storage), session);
  assert.equal(loadRoomSession("OTHER2", storage), null);
  clearRoomSession("ABC234", storage);
  assert.equal(loadRoomSession("ABC234", storage), null);
});

test("malformed sessions are rejected and storage failure uses session memory", () => {
  const storage = memoryStorage();
  storage.setItem("tabu:room-session", JSON.stringify({ ...session, sessionToken: "weak" }));
  assert.equal(loadRoomSession("ABC234", storage), null);
  const unavailable: RoomSessionStorage = {
    getItem() { throw new Error("storage unavailable"); },
    setItem() { throw new Error("storage unavailable"); },
    removeItem() { throw new Error("storage unavailable"); }
  };
  saveRoomSession(session, unavailable);
  assert.deepEqual(loadRoomSession("ABC234", unavailable), session);
  clearRoomSession("ABC234", unavailable);
  assert.equal(loadRoomSession("ABC234", unavailable), null);
});
