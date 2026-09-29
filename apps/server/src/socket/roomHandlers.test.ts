import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";
import { Server } from "socket.io";
import { io as connect, type Socket as ClientSocket } from "socket.io-client";
import type {
  CardResult,
  ClientToServerEvents,
  InterServerEvents,
  PersonalGameView,
  RoomState,
  ServerToClientEvents,
  SocketData
} from "@tabu/shared";
import { FakeRoundClock } from "../game/FakeRoundClock.test-helper.js";
import { RoomManager } from "../rooms/RoomManager.js";
import { registerRoomHandlers } from "./roomHandlers.js";

type TestClient = ClientSocket<ServerToClientEvents, ClientToServerEvents>;

async function waitFor(condition: () => boolean): Promise<void> {
  const deadline = Date.now() + 2000;
  while (!condition()) {
    if (Date.now() > deadline) throw new Error("Timed out waiting for socket events.");
    await new Promise<void>((resolve) => setTimeout(resolve, 5));
  }
}

test("card results reach every room member only after valid actions and reveal only the consumed word", async (context) => {
  const httpServer = createServer();
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer);
  const clock = new FakeRoundClock();
  registerRoomHandlers(io, new RoomManager(clock));
  await new Promise<void>((resolve) => httpServer.listen(0, "127.0.0.1", resolve));
  const address = httpServer.address();
  assert.ok(address && typeof address !== "string");
  const url = `http://127.0.0.1:${address.port}`;
  const clients: TestClient[] = Array.from({ length: 4 }, () =>
    connect(url, { transports: ["websocket"], reconnection: false }) as TestClient
  );
  context.after(async () => {
    clients.forEach((client) => client.disconnect());
    await new Promise<void>((resolve) => io.close(() => resolve()));
  });
  await Promise.all(clients.map((client) => new Promise<void>((resolve) => client.once("connect", resolve))));
  const [a1, a2, b1, b2] = clients as [TestClient, TestClient, TestClient, TestClient];
  const results: CardResult[][] = clients.map(() => []);
  const views: (PersonalGameView | null)[] = clients.map(() => null);
  const states: (RoomState | null)[] = clients.map(() => null);
  clients.forEach((client, index) => {
    client.on("game:card-result", (result) => results[index]!.push(result));
    client.on("game:view", (view) => { views[index] = view; });
    client.on("room:state", (room) => { states[index] = room; });
  });

  const created = await a1.emitWithAck("room:create", { name: "A1" });
  assert.equal(created.ok, true);
  if (!created.ok) return;
  const code = created.room.code;
  for (const [client, name] of [[a2, "A2"], [b1, "B1"], [b2, "B2"]] as const) {
    assert.equal((await client.emitWithAck("room:join", { name, roomCode: code })).ok, true);
  }
  assert.deepEqual(await a2.emitWithAck("room:move-player", { playerId: a2.id!, team: "A" }), {
    ok: false, error: "not-host"
  });
  await waitFor(() => states.every((state) => state?.players.length === 4));
  assert.equal(states[1]?.players.find((player) => player.id === a2.id)?.team, null);
  for (const client of [a1, a2]) {
    assert.deepEqual(await a1.emitWithAck("room:move-player", { playerId: client.id!, team: "A" }), { ok: true });
  }
  for (const client of [b1, b2]) {
    assert.deepEqual(await a1.emitWithAck("room:move-player", { playerId: client.id!, team: "B" }), { ok: true });
  }
  await waitFor(() => states.every((state) => state?.players.find((player) => player.id === b2.id)?.team === "B"));
  assert.ok(states.every((state) => state?.players.find((player) => player.id === a2.id)?.team === "A"));
  assert.deepEqual(await a2.emitWithAck("room:update-settings", { setting: "targetScore", value: 10 }), {
    ok: false, error: "not-host"
  });
  assert.deepEqual(await a1.emitWithAck("room:update-settings", { setting: "targetScore", value: 10 }), { ok: true });
  await waitFor(() => states.every((state) => state?.settings.targetScore === 10));
  assert.deepEqual(await a1.emitWithAck("room:set-captain", { team: "A", captainId: a2.id! }), { ok: true });
  assert.deepEqual(await a1.emitWithAck("room:set-captain", { team: "B", captainId: b1.id! }), { ok: true });
  assert.deepEqual(await a1.emitWithAck("game:start"), { ok: true });
  assert.deepEqual(await a1.emitWithAck("game:start-round"), { ok: true });
  await waitFor(() => views.every((view) => view?.roundId === 1));

  const firstCard = views[0]?.currentCard;
  const firstVersion = views[0]?.cardVersion;
  assert.ok(firstCard && firstVersion);
  assert.deepEqual(views[1], { roundId: views[0]?.roundId, cardVersion: null, currentCard: null });
  assert.deepEqual(views[2]?.currentCard, firstCard);
  assert.deepEqual(views[3]?.currentCard, firstCard);
  assert.equal(JSON.stringify(states[1]).includes(firstCard.word), false);
  assert.equal(JSON.stringify(views[1]).includes(firstCard.word), false);

  assert.deepEqual(await a2.emitWithAck("game:card-action", { action: "correct", cardVersion: firstVersion }), {
    ok: false, error: "not-authorized"
  });
  assert.deepEqual(results.map((items) => items.length), [0, 0, 0, 0]);

  assert.deepEqual(await a1.emitWithAck("game:card-action", { action: "correct", cardVersion: firstVersion }), { ok: true });
  await waitFor(() => results.every((items) => items.length === 1) && views.every((view) => view?.cardVersion !== firstVersion));
  assert.deepEqual(results.map((items) => items.length), [1, 1, 1, 1]);
  assert.deepEqual(results[1]![0], { action: "correct", word: firstCard.word });
  assert.deepEqual(Object.keys(results[1]![0]!).sort(), ["action", "word"]);
  assert.equal(JSON.stringify(results[1]![0]).includes("forbiddenWords"), false);
  assert.notEqual(results[1]![0]!.word, views[0]?.currentCard?.word);
  assert.deepEqual(views[1]?.currentCard, null);
  assert.deepEqual(await a1.emitWithAck("game:card-action", { action: "correct", cardVersion: firstVersion }), {
    ok: false, error: "stale-card"
  });
  assert.deepEqual(await b1.emitWithAck("game:card-action", { action: "tabu", cardVersion: firstVersion }), {
    ok: false, error: "stale-card"
  });
  assert.deepEqual(results.map((items) => items.length), [1, 1, 1, 1]);

  const passCard = views[0]?.currentCard;
  assert.ok(passCard);
  assert.deepEqual(await a1.emitWithAck("game:card-action", {
    action: "pass", cardVersion: views[0]!.cardVersion!
  }), { ok: true });
  await waitFor(() => results.every((items) => items.length === 2));
  assert.deepEqual(results.map((items) => items[1]), Array(4).fill(null).map(() => ({ action: "pass", word: passCard.word })));
  assert.deepEqual(views[1]?.currentCard, null);

  const tabuCard = views[2]?.currentCard;
  assert.ok(tabuCard);
  assert.deepEqual(await b1.emitWithAck("game:card-action", {
    action: "tabu", cardVersion: views[2]!.cardVersion!
  }), { ok: true });
  await waitFor(() => results.every((items) => items.length === 3) && states[0]?.game.scores.A === 0);
  assert.deepEqual(results.map((items) => items[2]), Array(4).fill(null).map(() => ({ action: "tabu", word: tabuCard.word })));
  assert.deepEqual(states[0]?.game.scores, { A: 0, B: 0 });
  assert.deepEqual(results.map((items) => items.length), [3, 3, 3, 3]);

  let winningVersion = 0;
  const winningEventOrder: string[] = [];
  a1.on("game:card-result", () => winningEventOrder.push("result"));
  a1.on("room:state", (room) => {
    if (room.game.phase === "game-over") winningEventOrder.push("game-over");
  });
  for (let score = 1; score <= 10; score += 1) {
    const card = views[0]?.currentCard;
    const version = views[0]?.cardVersion;
    assert.ok(card && version);
    winningVersion = version;
    assert.deepEqual(await a1.emitWithAck("game:card-action", { action: "correct", cardVersion: version }), { ok: true });
    await waitFor(() => results.every((items) => items.length === 3 + score) &&
      states.every((state) => state?.game.scores.A === score));
    assert.deepEqual(results[1]!.at(-1), { action: "correct", word: card.word });
    if (score < 10) {
      await waitFor(() => views[0]?.cardVersion !== version);
      winningEventOrder.length = 0;
    }
  }
  await waitFor(() => states.every((state) => state?.game.phase === "game-over") &&
    views.every((view) => view?.currentCard === null));
  assert.ok(states.every((state) => state?.game.winnerTeam === "A"));
  assert.ok(states.every((state) => state?.game.scores.A === 10));
  assert.ok(views.every((view) => view?.cardVersion === null));
  assert.deepEqual(winningEventOrder, ["result", "game-over"]);
  assert.equal(clock.activeTimerCount, 0);
  assert.deepEqual(await a1.emitWithAck("game:card-action", { action: "correct", cardVersion: winningVersion }), {
    ok: false, error: "round-not-active"
  });
  assert.deepEqual(await a1.emitWithAck("game:start-round"), { ok: false, error: "round-not-ready" });
  clock.advance(30_000);
  assert.deepEqual(results.map((items) => items.length), [13, 13, 13, 13]);
  assert.ok(states.every((state) => state?.game.phase === "game-over"));

  assert.deepEqual(await b1.emitWithAck("game:return-to-lobby"), { ok: false, error: "not-host" });
  assert.deepEqual(await a1.emitWithAck("game:return-to-lobby"), { ok: true });
  await waitFor(() => states.every((state) => state?.game.phase === "lobby") &&
    views.every((view) => view?.roundId === null && view.currentCard === null));
  assert.ok(states.every((state) => state?.game.winnerTeam === null && state.game.scores.A === 0));
  assert.ok(states.every((state) => state?.settings.targetScore === 10));
  assert.deepEqual(results.map((items) => items.length), [13, 13, 13, 13]);
  assert.deepEqual(await a1.emitWithAck("game:return-to-lobby"), { ok: false, error: "game-not-over" });
  assert.deepEqual(await a1.emitWithAck("game:start"), { ok: true });
  await waitFor(() => states.every((state) => state?.game.phase === "turn-preparation"));
  assert.ok(states.every((state) => state?.game.activeTeam === "A" && state.game.scores.A === 0));
});
