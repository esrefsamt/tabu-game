import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import type { TabuCard } from "@tabu/shared";
import { TABU_CARDS } from "../cards.js";
import { RoomDeckStore } from "../RoomDeckStore.js";
import { InMemoryCardHistoryStore, JsonFileCardHistoryStore } from "./CardHistoryStore.js";
import { HISTORY_DAY_MS, HistoryAwareCardSelector, historyPriority } from "./HistoryAwareCardSelector.js";

const cards = [
  { id: "a", word: "Elma", forbiddenWords: ["Meyve", "Kırmızı", "Ağaç", "Yemek", "Çekirdek"] },
  { id: "b", word: "Kitap", forbiddenWords: ["Sayfa", "Okumak", "Yazar", "Kapak", "Kütüphane"] },
  { id: "c", word: "Bisiklet", forbiddenWords: ["Pedal", "Zil", "Kask", "Tekerlek", "Sürmek"] },
  { id: "d", word: "Bulut", forbiddenWords: ["Gökyüzü", "Beyaz", "Yağmur", "Hava", "Pamuk"] },
  { id: "e", word: "Kalem", forbiddenWords: ["Yazmak", "Kâğıt", "Silgi", "Uç", "Mürekkep"] }
] as const satisfies readonly TabuCard[];

test("history boundaries follow unseen, 60, 30 and 7-day priority buckets", () => {
  const now = 100 * HISTORY_DAY_MS;
  assert.equal(historyPriority(undefined, now), 0);
  assert.equal(historyPriority(now - 60 * HISTORY_DAY_MS - 1, now), 1);
  assert.equal(historyPriority(now - 60 * HISTORY_DAY_MS, now), 2);
  assert.equal(historyPriority(now - 30 * HISTORY_DAY_MS - 1, now), 2);
  assert.equal(historyPriority(now - 30 * HISTORY_DAY_MS, now), 3);
  assert.equal(historyPriority(now - 7 * HISTORY_DAY_MS - 1, now), 3);
  assert.equal(historyPriority(now - 7 * HISTORY_DAY_MS, now), 4);
  assert.equal(historyPriority(now + HISTORY_DAY_MS, now), 4);
});

test("strict history priority and fallback choose the freshest available bucket", () => {
  const now = 100 * HISTORY_DAY_MS;
  const history = new InMemoryCardHistoryStore();
  history.recordSeen("p", "a", now - HISTORY_DAY_MS);
  history.recordSeen("p", "b", now - 61 * HISTORY_DAY_MS);
  history.recordSeen("p", "c", now - 31 * HISTORY_DAY_MS);
  history.recordSeen("p", "d", now - 8 * HISTORY_DAY_MS);
  const selector = new HistoryAwareCardSelector(history, "p", () => now, () => 0);
  assert.equal(selector.select(cards).id, "e");
  assert.equal(selector.select(cards.slice(0, 4)).id, "b");
  assert.equal(selector.select([cards[0]!, cards[2]!, cards[3]!]).id, "c");
  assert.equal(selector.select([cards[0]!, cards[3]!]).id, "d");
  assert.equal(selector.select([cards[0]!]).id, "a");
});

test("selection remains random inside the highest nonempty bucket", () => {
  const selector = new HistoryAwareCardSelector(
    new InMemoryCardHistoryStore(), "p", () => 0,
    (maxExclusive) => maxExclusive - 1
  );
  assert.equal(selector.select([cards[0]!, cards[1]!]).id, "b");
});

test("recording updates server timestamps and increments timesSeen", () => {
  const history = new InMemoryCardHistoryStore();
  assert.deepEqual(history.recordSeen("p", "a", 100), { cardId: "a", lastSeenAt: 100, timesSeen: 1 });
  assert.deepEqual(history.recordSeen("p", "a", 250), { cardId: "a", lastSeenAt: 250, timesSeen: 2 });
  assert.equal(history.get("other", "a"), undefined);
});

test("JSON history survives store reopening and keeps profiles independent", (context) => {
  const directory = mkdtempSync(join(tmpdir(), "tabu-card-history-"));
  context.after(() => rmSync(directory, { recursive: true, force: true }));
  const file = join(directory, "history.json");
  const first = new JsonFileCardHistoryStore(file);
  first.recordSeen("profile-a", "a", 100);
  first.recordSeen("profile-a", "a", 200);
  first.recordSeen("profile-a", "removed-card-id", 150);
  first.recordSeen("profile-b", "b", 300);
  const serialized = readFileSync(file, "utf8");
  assert.equal(serialized.includes("Elma"), false);
  assert.equal(serialized.includes("forbiddenWords"), false);
  const reopened = new JsonFileCardHistoryStore(file);
  assert.deepEqual(reopened.get("profile-a", "a"), { cardId: "a", lastSeenAt: 200, timesSeen: 2 });
  assert.equal(reopened.get("profile-a", "b"), undefined);
  assert.deepEqual(reopened.get("profile-b", "b"), { cardId: "b", lastSeenAt: 300, timesSeen: 1 });
  assert.equal(reopened.get("profile-a", "removed-card-id")?.cardId, "removed-card-id");
  const selector = new HistoryAwareCardSelector(reopened, "profile-a", () => 400, () => 0);
  assert.equal(selector.select([cards[1]!]).id, "b");
});

test("custom history path creates its parent directory", (context) => {
  const directory = mkdtempSync(join(tmpdir(), "tabu-history-parent-"));
  context.after(() => rmSync(directory, { recursive: true, force: true }));
  const file = join(directory, "mounted", "nested", "history.json");
  new JsonFileCardHistoryStore(file).recordSeen("profile", "a", 100);
  assert.deepEqual(new JsonFileCardHistoryStore(file).get("profile", "a"),
    { cardId: "a", lastSeenAt: 100, timesSeen: 1 });
});

test("room-local no-repeat stays stronger while shared history affects new rooms", () => {
  let now = 1_000;
  const history = new InMemoryCardHistoryStore();
  const rooms = new RoomDeckStore(cards, () => 0, history, () => now);
  rooms.create("ONE", "profile");
  rooms.setEligibleCards("ONE", cards.slice(0, 2));
  const first = rooms.draw("ONE");
  now += 1;
  const second = rooms.draw("ONE");
  assert.notEqual(second.id, first.id);
  assert.equal(history.get("profile", first.id)?.timesSeen, 1);

  rooms.remove("ONE");
  rooms.create("TWO", "profile");
  rooms.setEligibleCards("TWO", cards.slice(0, 2));
  assert.equal(rooms.draw("TWO").id, second.id === "a" ? "b" : "a");

  rooms.create("FRESH", "different-profile");
  rooms.setEligibleCards("FRESH", cards.slice(0, 2));
  assert.equal(rooms.draw("FRESH").id, "a");
});

test("categories filter before history and changing categories does not erase history", () => {
  const history = new InMemoryCardHistoryStore();
  const rooms = new RoomDeckStore(cards, () => 0, history, () => 5_000);
  history.recordSeen("p", "a", 4_000);
  rooms.create("ROOM", "p");
  rooms.setEligibleCards("ROOM", [cards[0]!, cards[1]!]);
  assert.equal(rooms.draw("ROOM").id, "b");
  rooms.setEligibleCards("ROOM", [cards[2]!, cards[3]!]);
  assert.equal(rooms.draw("ROOM").id, "c");
  assert.deepEqual(history.get("p", "a"), { cardId: "a", lastSeenAt: 4_000, timesSeen: 1 });
  assert.equal(history.get("p", "e"), undefined);
});

test("two simultaneous rooms sharing a profile observe each other's draws", () => {
  const history = new InMemoryCardHistoryStore();
  const rooms = new RoomDeckStore(cards, () => 0, history, () => 10_000);
  rooms.create("A", "shared");
  rooms.create("B", "shared");
  rooms.setEligibleCards("A", cards.slice(0, 2));
  rooms.setEligibleCards("B", cards.slice(0, 2));
  assert.equal(rooms.draw("A").id, "a");
  assert.equal(rooms.draw("B").id, "b");
  assert.equal(history.get("shared", "a")?.timesSeen, 1);
  assert.equal(history.get("shared", "b")?.timesSeen, 1);
});

test("a later new room avoids twenty recent cards while a fresh profile stays independent", () => {
  const sessionCards = TABU_CARDS.slice(0, 25);
  const history = new InMemoryCardHistoryStore();
  let now = 10 * HISTORY_DAY_MS;
  const rooms = new RoomDeckStore(sessionCards, () => 0, history, () => now);
  rooms.create("DAY-ONE", "browser-a");
  const recentIds = new Set<string>();
  for (let index = 0; index < 20; index += 1) {
    recentIds.add(rooms.draw("DAY-ONE").id);
    now += 1;
  }
  assert.equal(recentIds.size, 20);
  rooms.remove("DAY-ONE");

  now += HISTORY_DAY_MS;
  rooms.create("DAY-TWO", "browser-a");
  const nextSession = Array.from({ length: 5 }, () => rooms.draw("DAY-TWO").id);
  assert.ok(nextSession.every((cardId) => !recentIds.has(cardId)));

  rooms.create("PRIVATE", "browser-private");
  assert.ok(recentIds.has(rooms.draw("PRIVATE").id));
});
