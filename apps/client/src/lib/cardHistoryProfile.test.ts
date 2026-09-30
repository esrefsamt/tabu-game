import assert from "node:assert/strict";
import test from "node:test";
import {
  CARD_HISTORY_PROFILE_STORAGE_KEY,
  getCardHistoryProfileId,
  isValidHistoryProfileId,
  type CardHistoryProfileStorage
} from "./cardHistoryProfile";

const FIRST_ID = "11111111-1111-4111-8111-111111111111";
const SECOND_ID = "22222222-2222-4222-8222-222222222222";

function memoryStorage(initial?: string): CardHistoryProfileStorage & { value: string | null } {
  return {
    value: initial ?? null,
    getItem(key) { return key === CARD_HISTORY_PROFILE_STORAGE_KEY ? this.value : null; },
    setItem(key, value) { if (key === CARD_HISTORY_PROFILE_STORAGE_KEY) this.value = value; }
  };
}

test("first use creates and stores a history profile ID", () => {
  const storage = memoryStorage();
  assert.equal(getCardHistoryProfileId(storage, () => FIRST_ID), FIRST_ID);
  assert.equal(storage.value, FIRST_ID);
  assert.equal(isValidHistoryProfileId(storage.value), true);
});

test("repeated calls reuse the same stored history profile ID", () => {
  const storage = memoryStorage(FIRST_ID);
  assert.equal(getCardHistoryProfileId(storage, () => SECOND_ID), FIRST_ID);
  assert.equal(getCardHistoryProfileId(storage, () => SECOND_ID), FIRST_ID);
});

test("an invalid stored value is replaced with a fresh UUID", () => {
  const storage = memoryStorage("player-name-is-not-an-id");
  assert.equal(getCardHistoryProfileId(storage, () => SECOND_ID), SECOND_ID);
  assert.equal(storage.value, SECOND_ID);
});

test("storage failures reuse a temporary in-memory profile", () => {
  const unavailableStorage: CardHistoryProfileStorage = {
    getItem() { throw new Error("storage unavailable"); },
    setItem() { throw new Error("storage unavailable"); }
  };
  const first = getCardHistoryProfileId(unavailableStorage, () => FIRST_ID);
  const second = getCardHistoryProfileId(unavailableStorage, () => SECOND_ID);
  assert.equal(first, second);
});
