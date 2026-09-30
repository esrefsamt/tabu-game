import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";
import { Server } from "socket.io";
import { io as connect, type Socket as ClientSocket } from "socket.io-client";
import type { ClientToServerEvents, InterServerEvents, RoomState, ServerToClientEvents, SocketData } from "@tabu/shared";
import { FakeRoundClock } from "../game/FakeRoundClock.test-helper.js";
import { InMemoryCardHistoryStore } from "../cards/history/CardHistoryStore.js";
import { registerRoomHandlers } from "../socket/roomHandlers.js";
import { PlayerSessionManager, RECONNECT_GRACE_MS, type SessionClock } from "./PlayerSessionManager.js";
import { RoomManager } from "./RoomManager.js";

type TestClient = ClientSocket<ServerToClientEvents, ClientToServerEvents>;
const PROFILE = "11111111-1111-4111-8111-111111111111";

class FakeSessionClock implements SessionClock {
  private now = 0;
  private next = 0;
  private timers = new Map<number, { at: number; callback: () => void }>();
  setTimeout(callback: () => void, delay: number): ReturnType<typeof setTimeout> {
    const id = ++this.next;
    this.timers.set(id, { at: this.now + delay, callback });
    return id as unknown as ReturnType<typeof setTimeout>;
  }
  clearTimeout(timer: ReturnType<typeof setTimeout>): void {
    this.timers.delete(timer as unknown as number);
  }
  advance(ms: number): void {
    this.now += ms;
    for (const [id, timer] of [...this.timers]) {
      if (timer.at <= this.now) {
        this.timers.delete(id);
        timer.callback();
      }
    }
  }
}

async function waitFor(condition: () => boolean): Promise<void> {
  const deadline = Date.now() + 2000;
  while (!condition()) {
    if (Date.now() > deadline) throw new Error("Timed out waiting for room state.");
    await new Promise<void>((resolve) => setTimeout(resolve, 5));
  }
}

async function fixture(context: { after(callback: () => Promise<void>): void }) {
  const http = createServer();
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(http);
  const sessionClock = new FakeSessionClock();
  const roundClock = new FakeRoundClock();
  const history = new InMemoryCardHistoryStore();
  const rooms = new RoomManager(roundClock, history);
  registerRoomHandlers(io, rooms, sessionClock);
  await new Promise<void>((resolve) => http.listen(0, "127.0.0.1", resolve));
  const address = http.address();
  assert.ok(address && typeof address !== "string");
  const url = `http://127.0.0.1:${address.port}`;
  const clients: TestClient[] = [];
  context.after(async () => {
    clients.forEach((client) => client.disconnect());
    await new Promise<void>((resolve) => io.close(() => resolve()));
  });
  async function player(): Promise<TestClient> {
    const socket = connect(url, { transports: ["websocket"], reconnection: false }) as TestClient;
    clients.push(socket);
    await new Promise<void>((resolve) => socket.once("connect", resolve));
    return socket;
  }
  return { player, rooms, sessionClock, roundClock, history };
}

async function startThreePlayerRound(player: () => Promise<TestClient>) {
  const host = await player();
  const teammate = await player();
  const opponent = await player();
  const created = await host.emitWithAck("room:create", { name: "A1", historyProfileId: PROFILE });
  assert.equal(created.ok, true);
  if (!created.ok) throw new Error("Room creation failed.");
  const code = created.room.code;
  const a2 = await teammate.emitWithAck("room:join", { name: "A2", roomCode: code });
  const b1 = await opponent.emitWithAck("room:join", { name: "B1", roomCode: code });
  assert.equal(a2.ok && b1.ok, true);
  if (!a2.ok || !b1.ok) throw new Error("Room join failed.");
  for (const playerId of [created.playerId, a2.playerId]) {
    assert.deepEqual(await host.emitWithAck("room:move-player", { playerId, team: "A" }), { ok: true });
  }
  assert.deepEqual(await host.emitWithAck("room:move-player", { playerId: b1.playerId, team: "B" }), { ok: true });
  assert.deepEqual(await host.emitWithAck("room:set-captain", { team: "A", captainId: a2.playerId }), { ok: true });
  assert.deepEqual(await host.emitWithAck("room:set-captain", { team: "B", captainId: b1.playerId }), { ok: true });
  assert.deepEqual(await host.emitWithAck("game:start"), { ok: true });
  assert.deepEqual(await host.emitWithAck("game:start-round"), { ok: true });
  return { host, teammate, opponent, created, code };
}

test("session manager replaces sockets, cancels grace, and expires once", () => {
  const clock = new FakeSessionClock();
  const expired: string[] = [];
  const sessions = new PlayerSessionManager((room, player) => expired.push(`${room}:${player}`), clock);
  const token = sessions.create("ABC234", "player-1", "socket-1");
  assert.match(token, /^[0-9a-f]{64}$/);
  assert.notEqual(token, "socket-1");
  assert.equal(sessions.disconnect("socket-1")?.playerId, "player-1");
  clock.advance(RECONNECT_GRACE_MS - 1);
  assert.deepEqual(sessions.resume("ABC234", token, "socket-2"), { playerId: "player-1", previousSocketId: null });
  clock.advance(1);
  assert.deepEqual(expired, []);
  assert.equal(sessions.current("socket-1"), null);
  assert.equal(sessions.current("socket-2")?.playerId, "player-1");
  assert.deepEqual(sessions.resume("OTHER", token, "socket-3"), null);
  assert.deepEqual(sessions.resume("ABC234", "wrong", "socket-3"), null);
  assert.deepEqual(sessions.resume("ABC234", token, "socket-3"), { playerId: "player-1", previousSocketId: "socket-2" });
  assert.equal(sessions.current("socket-2"), null);
  sessions.disconnect("socket-3");
  clock.advance(RECONNECT_GRACE_MS);
  assert.deepEqual(expired, ["ABC234:player-1"]);
  assert.equal(sessions.resume("ABC234", token, "socket-4"), null);
});

test("three players retain identity, roles, and room during reconnect; stale tab loses control", async (context) => {
  const { player, rooms, sessionClock } = await fixture(context);
  const host = await player();
  const guest = await player();
  const opponent = await player();
  const latest: { room: RoomState | null } = { room: null };
  host.on("room:state", (room) => { latest.room = room; });
  const created = await host.emitWithAck("room:create", { name: "Host", historyProfileId: PROFILE });
  assert.equal(created.ok, true);
  if (!created.ok) return;
  const { room, playerId: hostId, sessionToken: hostToken } = created;
  assert.notEqual(hostId, host.id);
  assert.notEqual(hostToken, host.id);
  assert.equal(JSON.stringify(room).includes(hostToken), false);
  const joined = await guest.emitWithAck("room:join", { name: "Guest", roomCode: room.code });
  const other = await opponent.emitWithAck("room:join", { name: "Other", roomCode: room.code });
  assert.equal(joined.ok && other.ok, true);
  if (!joined.ok || !other.ok) return;
  assert.notEqual(joined.sessionToken, guest.id);
  assert.equal(JSON.stringify(joined.room).includes(joined.sessionToken), false);
  assert.deepEqual(await host.emitWithAck("room:move-player", { playerId: hostId, team: "A" }), { ok: true });
  assert.deepEqual(await host.emitWithAck("room:move-player", { playerId: joined.playerId, team: "A" }), { ok: true });
  assert.deepEqual(await host.emitWithAck("room:move-player", { playerId: other.playerId, team: "B" }), { ok: true });
  assert.deepEqual(await host.emitWithAck("room:set-captain", { team: "A", captainId: joined.playerId }), { ok: true });
  assert.deepEqual(await host.emitWithAck("room:set-captain", { team: "B", captainId: other.playerId }), { ok: true });

  guest.disconnect();
  await waitFor(() => latest.room?.players.find((item) => item.id === joined.playerId)?.isConnected === false);
  assert.equal(latest.room?.players.length, 3);
  assert.equal(latest.room?.captainAId, joined.playerId);
  const resumedGuest = await player();
  const resumed = await resumedGuest.emitWithAck("room:resume", { roomCode: room.code, sessionToken: joined.sessionToken });
  assert.equal(resumed.ok, true);
  if (!resumed.ok) return;
  assert.equal(resumed.playerId, joined.playerId);
  assert.equal(resumed.room.players.length, 3);
  assert.equal(resumed.room.players.find((item) => item.id === joined.playerId)?.team, "A");
  assert.equal(resumed.room.captainAId, joined.playerId);
  sessionClock.advance(RECONNECT_GRACE_MS);
  assert.equal(rooms.hasPlayer(room.code, joined.playerId), true);

  let moved = false;
  host.on("room:session-moved", () => { moved = true; });
  const newHostTab = await player();
  const hostResume = await newHostTab.emitWithAck("room:resume", { roomCode: room.code, sessionToken: hostToken });
  assert.equal(hostResume.ok, true);
  if (!hostResume.ok) return;
  await waitFor(() => moved);
  assert.equal(hostResume.playerId, hostId);
  assert.equal(hostResume.room.players.filter((item) => item.id === hostId).length, 1);
  assert.equal(hostResume.room.players.find((item) => item.id === hostId)?.isHost, true);
  assert.deepEqual(await host.emitWithAck("room:update-settings", { setting: "targetScore", value: 10 }),
    { ok: false, error: "not-in-room" });
  assert.deepEqual(await newHostTab.emitWithAck("room:update-settings", { setting: "targetScore", value: 10 }), { ok: true });
  assert.deepEqual(await opponent.emitWithAck("room:resume", { roomCode: room.code, sessionToken: hostToken }),
    { ok: false, error: "already-in-room" });
  assert.deepEqual(await resumedGuest.emitWithAck("room:resume", { roomCode: "ZZZ999", sessionToken: joined.sessionToken }),
    { ok: false, error: "already-in-room" });
  const stranger = await player();
  assert.deepEqual(await stranger.emitWithAck("room:resume", { roomCode: room.code, sessionToken: "b".repeat(64) }),
    { ok: false, error: "invalid-session" });
  const separate = await stranger.emitWithAck("room:create", { name: "Separate", historyProfileId: PROFILE });
  assert.equal(separate.ok, true);
  if (!separate.ok) return;
  const wrongRoom = await player();
  assert.deepEqual(await wrongRoom.emitWithAck("room:resume", { roomCode: separate.room.code, sessionToken: hostToken }),
    { ok: false, error: "invalid-session" });
  assert.deepEqual(await newHostTab.emitWithAck("room:leave"), { ok: true });
  assert.equal(rooms.hasPlayer(room.code, hostId), false);
  assert.deepEqual(await wrongRoom.emitWithAck("room:resume", { roomCode: room.code, sessionToken: hostToken }),
    { ok: false, error: "invalid-session" });
});

test("host and captain transfer only after grace, and room survives temporary total disconnect", async (context) => {
  const { player, rooms, sessionClock } = await fixture(context);
  const host = await player();
  const guest = await player();
  const created = await host.emitWithAck("room:create", { name: "Host", historyProfileId: PROFILE });
  assert.equal(created.ok, true);
  if (!created.ok) return;
  const joined = await guest.emitWithAck("room:join", { name: "Guest", roomCode: created.room.code });
  assert.equal(joined.ok, true);
  if (!joined.ok) return;
  await host.emitWithAck("room:move-player", { playerId: created.playerId, team: "A" });
  await host.emitWithAck("room:set-captain", { team: "A", captainId: created.playerId });
  host.disconnect();
  await waitFor(() => rooms.getRoomState(created.room.code)?.players.find((item) => item.id === created.playerId)?.isConnected === false);
  const during = rooms.getRoomState(created.room.code)!;
  assert.equal(during.players.find((item) => item.id === created.playerId)?.isHost, true);
  assert.equal(during.captainAId, created.playerId);
  sessionClock.advance(RECONNECT_GRACE_MS);
  const after = rooms.getRoomState(created.room.code)!;
  assert.equal(after.players.some((item) => item.id === created.playerId), false);
  assert.equal(after.players.find((item) => item.id === joined.playerId)?.isHost, true);
  assert.equal(after.captainAId, null);
  const expired = await player();
  assert.deepEqual(await expired.emitWithAck("room:resume", { roomCode: created.room.code, sessionToken: created.sessionToken }),
    { ok: false, error: "invalid-session" });
  guest.disconnect();
  assert.equal(rooms.hasRoom(created.room.code), true);
  await waitFor(() => rooms.getRoomState(created.room.code)?.players.find((item) => item.id === joined.playerId)?.isConnected === false);
  sessionClock.advance(RECONNECT_GRACE_MS);
  assert.equal(rooms.hasRoom(created.room.code), false);
});

test("reconnecting players receive authorized cards and a paused clue giver resumes the same round", async (context) => {
  const { player, rooms, roundClock, history } = await fixture(context);
  const a1 = await player();
  const a2 = await player();
  const b1 = await player();
  const b2 = await player();
  const created = await a1.emitWithAck("room:create", { name: "A1", historyProfileId: PROFILE });
  assert.equal(created.ok, true);
  if (!created.ok) return;
  const code = created.room.code;
  const joined = [];
  for (const [socket, name] of [[a2, "A2"], [b1, "B1"], [b2, "B2"]] as const) {
    const result = await socket.emitWithAck("room:join", { name, roomCode: code });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    joined.push(result);
  }
  const [a2Session, b1Session, b2Session] = joined;
  assert.ok(a2Session && b1Session && b2Session);
  for (const id of [created.playerId, a2Session.playerId]) {
    assert.deepEqual(await a1.emitWithAck("room:move-player", { playerId: id, team: "A" }), { ok: true });
  }
  for (const id of [b1Session.playerId, b2Session.playerId]) {
    assert.deepEqual(await a1.emitWithAck("room:move-player", { playerId: id, team: "B" }), { ok: true });
  }
  assert.deepEqual(await a1.emitWithAck("room:set-captain", { team: "A", captainId: a2Session.playerId }), { ok: true });
  assert.deepEqual(await a1.emitWithAck("room:set-captain", { team: "B", captainId: b1Session.playerId }), { ok: true });
  assert.deepEqual(await a1.emitWithAck("room:update-settings", { setting: "targetScore", value: 10 }), { ok: true });
  assert.deepEqual(await a1.emitWithAck("game:start"), { ok: true });
  assert.deepEqual(await a1.emitWithAck("game:start-round"), { ok: true });
  const active = rooms.getRoomState(code)!;
  const card = rooms.getPersonalGameView(code, created.playerId)!.currentCard!;
  assert.equal(history.get(PROFILE, card.id)?.timesSeen, 1);
  assert.equal(active.game.phase, "round-active");
  assert.equal(roundClock.activeTimerCount, 1);

  a2.disconnect();
  await waitFor(() => rooms.getRoomState(code)?.players.find((item) => item.id === a2Session.playerId)?.isConnected === false);
  assert.equal(rooms.getRoomState(code)?.game.phase, "round-active");
  assert.equal(rooms.getRoomState(code)?.game.roundPausedRemainingMs, null);
  const a2Again = await player();
  const teammateViews: Array<{ currentCard: unknown }> = [];
  a2Again.on("game:view", (view) => teammateViews.push(view));
  const teammateResume = await a2Again.emitWithAck("room:resume", { roomCode: code, sessionToken: a2Session.sessionToken });
  assert.equal(teammateResume.ok, true);
  await waitFor(() => teammateViews.length > 0);
  assert.equal(teammateViews.at(-1)?.currentCard, null);
  assert.equal(JSON.stringify(teammateViews).includes(card.word), false);

  b1.disconnect();
  await waitFor(() => rooms.getRoomState(code)?.players.find((item) => item.id === b1Session.playerId)?.isConnected === false);
  assert.equal(rooms.getRoomState(code)?.captainBId, b1Session.playerId);
  assert.equal(rooms.getRoomState(code)?.game.phase, "round-active");
  assert.equal(rooms.getRoomState(code)?.game.roundPausedRemainingMs, null);
  const b1Again = await player();
  const opponentViews: Array<{ currentCard: { id: string } | null; cardVersion: number | null }> = [];
  b1Again.on("game:view", (view) => opponentViews.push(view));
  const captainResume = await b1Again.emitWithAck("room:resume", { roomCode: code, sessionToken: b1Session.sessionToken });
  assert.equal(captainResume.ok, true);
  await waitFor(() => opponentViews.length > 0);
  assert.equal(opponentViews.at(-1)?.currentCard?.id, card.id);
  assert.deepEqual(await b1Again.emitWithAck("game:card-action", {
    action: "tabu", cardVersion: opponentViews.at(-1)!.cardVersion!
  }), { ok: true });
  assert.equal(rooms.getRoomState(code)?.game.scores.A, -1);

  const passVersion = rooms.getPersonalGameView(code, created.playerId)!.cardVersion!;
  assert.deepEqual(await a1.emitWithAck("game:card-action", { action: "pass", cardVersion: passVersion }), { ok: true });
  const pausedCard = rooms.getPersonalGameView(code, created.playerId)!.currentCard!;
  const pausedVersion = rooms.getPersonalGameView(code, created.playerId)!.cardVersion!;
  assert.equal(rooms.getRoomState(code)?.game.passesUsed, 1);
  const replacement = await player();
  const moved = await replacement.emitWithAck("room:resume", { roomCode: code, sessionToken: created.sessionToken });
  assert.equal(moved.ok, true);
  a1.disconnect();
  await new Promise<void>((resolve) => setTimeout(resolve, 20));
  assert.equal(rooms.getRoomState(code)?.game.roundPausedRemainingMs, null);
  assert.equal(roundClock.activeTimerCount, 1);
  roundClock.advance(20_000);

  replacement.disconnect();
  await waitFor(() => rooms.getRoomState(code)?.game.roundPausedRemainingMs === 40_000);
  assert.equal(rooms.getRoomState(code)?.game.phase, "round-active");
  assert.equal(rooms.getRoomState(code)?.game.activeTeam, "A");
  assert.equal(rooms.getRoomState(code)?.game.clueGiverId, created.playerId);
  assert.equal(rooms.getRoomState(code)?.game.scores.A, -1);
  assert.equal(rooms.getRoomState(code)?.game.passesUsed, 1);
  assert.equal(rooms.getRoomState(code)?.game.roundEndsAt, null);
  assert.equal(roundClock.activeTimerCount, 0);
  assert.equal(rooms.getPersonalGameView(code, b1Session.playerId)?.currentCard?.id, pausedCard.id);
  assert.equal(rooms.getPersonalGameView(code, a2Session.playerId)?.currentCard, null);
  assert.equal(rooms.getPersonalGameView(code, created.playerId)?.cardVersion, pausedVersion);
  for (const action of ["correct", "pass", "tabu"] as const) {
    assert.deepEqual(rooms.cardAction(code, created.playerId, { action, cardVersion: pausedVersion }),
      { ok: false, error: "round-not-active" });
  }
  assert.deepEqual(await b1Again.emitWithAck("game:card-action", { action: "tabu", cardVersion: pausedVersion }),
    { ok: false, error: "round-not-active" });
  assert.equal(rooms.getRoomState(code)?.players.find((item) => item.id === created.playerId)?.isHost, true);
  roundClock.advance(3_000);
  assert.equal(rooms.getRoomState(code)?.game.roundPausedRemainingMs, 40_000);
  const a1Again = await player();
  const clueViews: Array<{ currentCard: { id: string } | null; cardVersion: number | null }> = [];
  a1Again.on("game:view", (view) => clueViews.push(view));
  const clueResume = await a1Again.emitWithAck("room:resume", { roomCode: code, sessionToken: created.sessionToken });
  assert.equal(clueResume.ok, true);
  if (!clueResume.ok) return;
  await waitFor(() => clueViews.length > 0);
  assert.equal(clueViews.at(-1)?.currentCard?.id, pausedCard.id);
  assert.equal(clueViews.at(-1)?.cardVersion, pausedVersion);
  assert.equal(clueResume.room.game.phase, "round-active");
  assert.equal(clueResume.room.game.roundPausedRemainingMs, null);
  assert.equal(clueResume.room.game.roundEndsAt, roundClock.now() + 40_000);
  assert.equal(clueResume.room.game.passesUsed, 1);
  assert.equal(clueResume.room.players.find((item) => item.id === created.playerId)?.isHost, true);
  assert.equal(history.get(PROFILE, pausedCard.id)?.timesSeen, 1);
  assert.equal(roundClock.activeTimerCount, 1);
  roundClock.advance(39_999);
  assert.equal(rooms.getRoomState(code)?.game.phase, "round-active");
  roundClock.advance(1);
  assert.equal(rooms.getRoomState(code)?.game.phase, "turn-preparation");
  assert.equal(rooms.getRoomState(code)?.game.activeTeam, "B");
  assert.equal(roundClock.activeTimerCount, 0);

  b1Again.disconnect();
  await waitFor(() => rooms.getRoomState(code)?.players.find((item) => item.id === b1Session.playerId)?.isConnected === false);
  assert.equal(rooms.getRoomState(code)?.game.clueGiverId, b1Session.playerId);
  const b1Third = await player();
  const prepResume = await b1Third.emitWithAck("room:resume", { roomCode: code, sessionToken: b1Session.sessionToken });
  assert.equal(prepResume.ok, true);
  assert.equal(prepResume.ok && prepResume.room.game.clueGiverId, b1Session.playerId);
  assert.deepEqual(await b1Third.emitWithAck("game:start-round"), { ok: true });
  assert.equal(rooms.getRoomState(code)?.game.phase, "round-active");

  for (let index = 0; index < 10; index += 1) {
    const version = rooms.getPersonalGameView(code, b1Session.playerId)?.cardVersion;
    assert.ok(version);
    assert.deepEqual(await b1Third.emitWithAck("game:card-action", { action: "correct", cardVersion: version }), { ok: true });
  }
  assert.equal(rooms.getRoomState(code)?.game.phase, "game-over");
  assert.equal(rooms.getRoomState(code)?.game.winnerTeam, "B");
  a1Again.disconnect();
  await waitFor(() => rooms.getRoomState(code)?.players.find((item) => item.id === created.playerId)?.isConnected === false);
  const winnerHost = await player();
  const winnerResume = await winnerHost.emitWithAck("room:resume", { roomCode: code, sessionToken: created.sessionToken });
  assert.equal(winnerResume.ok, true);
  if (!winnerResume.ok) return;
  assert.equal(winnerResume.room.game.phase, "game-over");
  assert.equal(winnerResume.room.players.find((item) => item.id === created.playerId)?.isHost, true);
  assert.deepEqual(await winnerHost.emitWithAck("game:return-to-lobby"), { ok: true });
  assert.equal(rooms.getRoomState(code)?.settings.targetScore, 10);
  assert.deepEqual(await winnerHost.emitWithAck("game:start"), { ok: true });
  assert.equal(rooms.getRoomState(code)?.game.phase, "turn-preparation");
});

test("a reconnecting player occupies a full-room slot until grace expires", async (context) => {
  const { player, rooms, sessionClock } = await fixture(context);
  const host = await player();
  const created = await host.emitWithAck("room:create", { name: "Host", historyProfileId: PROFILE });
  assert.equal(created.ok, true);
  if (!created.ok) return;
  const members: TestClient[] = [];
  for (let index = 1; index < 10; index += 1) {
    const member = await player();
    members.push(member);
    assert.equal((await member.emitWithAck("room:join", { name: `P${index}`, roomCode: created.room.code })).ok, true);
  }
  const last = members.at(-1)!;
  last.disconnect();
  await waitFor(() => rooms.getRoomState(created.room.code)?.players.some((item) => !item.isConnected) === true);
  const newPlayer = await player();
  assert.deepEqual(await newPlayer.emitWithAck("room:join", { name: "Extra", roomCode: created.room.code }),
    { ok: false, error: "room-full" });
  sessionClock.advance(RECONNECT_GRACE_MS);
  await waitFor(() => rooms.getRoomState(created.room.code)?.players.length === 9);
  const joined = await newPlayer.emitWithAck("room:join", { name: "Extra", roomCode: created.room.code });
  assert.equal(joined.ok, true);
  assert.equal(rooms.getRoomState(created.room.code)?.players.length, 10);
});

test("grace expiry aborts a paused round once and explicit leave aborts immediately", async (context) => {
  const { player, rooms, sessionClock, roundClock, history } = await fixture(context);
  const first = await startThreePlayerRound(player);
  const cardId = rooms.getPersonalGameView(first.code, first.created.playerId)?.currentCard?.id;
  assert.ok(cardId);
  roundClock.advance(12_000);
  first.host.disconnect();
  await waitFor(() => rooms.getRoomState(first.code)?.game.roundPausedRemainingMs === 48_000);
  assert.equal(rooms.getRoomState(first.code)?.game.phase, "round-active");
  assert.equal(roundClock.activeTimerCount, 0);
  sessionClock.advance(RECONNECT_GRACE_MS);
  assert.equal(rooms.getRoomState(first.code)?.game.phase, "turn-preparation");
  assert.equal(rooms.getRoomState(first.code)?.game.activeTeam, "B");
  assert.equal(rooms.getRoomState(first.code)?.game.scores.A, 0);
  assert.equal(rooms.getPersonalGameView(first.code, first.created.playerId), null);
  assert.equal(history.get(PROFILE, cardId)?.timesSeen, 1);
  sessionClock.advance(RECONNECT_GRACE_MS);
  assert.equal(rooms.getRoomState(first.code)?.game.activeTeam, "B");

  const second = await startThreePlayerRound(player);
  assert.deepEqual(await second.host.emitWithAck("room:leave"), { ok: true });
  assert.equal(rooms.getRoomState(second.code)?.game.phase, "turn-preparation");
  assert.equal(rooms.getRoomState(second.code)?.game.activeTeam, "B");
  assert.equal(rooms.getRoomState(second.code)?.game.roundPausedRemainingMs, null);
  assert.equal(roundClock.activeTimerCount, 0);
  assert.equal(rooms.hasPlayer(second.code, second.created.playerId), false);
});
