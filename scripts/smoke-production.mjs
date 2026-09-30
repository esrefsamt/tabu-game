import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { io } from "socket.io-client";

const origin = "https://tabu-client.example";
const serverFile = fileURLToPath(new URL("../apps/server/dist/index.js", import.meta.url));
const clientIndex = fileURLToPath(new URL("../apps/client/dist/index.html", import.meta.url));
const clientDirectory = fileURLToPath(new URL("../apps/client/", import.meta.url));
const viteFile = fileURLToPath(new URL("../node_modules/vite/bin/vite.js", import.meta.url));
const directory = await mkdtemp(join(tmpdir(), "tabu-production-smoke-"));
const historyFile = join(directory, "mounted", "history.json");
const sockets = [];
let server;
let preview;

async function freePort() {
  const listener = createServer();
  await new Promise((resolve) => listener.listen(0, "127.0.0.1", resolve));
  const port = listener.address().port;
  await new Promise((resolve) => listener.close(resolve));
  return port;
}

async function connect(url, socketOrigin, transports = ["websocket"]) {
  const socket = io(url, {
    autoConnect: false,
    transports,
    extraHeaders: { Origin: socketOrigin },
    reconnection: false,
    timeout: 2000
  });
  sockets.push(socket);
  return new Promise((resolve, reject) => {
    socket.once("connect", () => resolve(socket));
    socket.once("connect_error", reject);
    socket.connect();
  });
}

try {
  const port = await freePort();
  const url = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, [serverFile], {
    env: { ...process.env, NODE_ENV: "production", PORT: String(port),
      CLIENT_ORIGIN: origin, CARD_HISTORY_FILE: historyFile },
    stdio: "ignore",
    windowsHide: true
  });
  let health;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      health = await fetch(`${url}/api/health`, { headers: { Origin: origin } });
      break;
    } catch {
      if (server.exitCode !== null) throw new Error(`Compiled server exited: ${server.exitCode}`);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  assert.ok(health, "compiled server did not start");
  assert.deepEqual(await health.json(), { status: "ok" });
  assert.equal(health.headers.get("access-control-allow-origin"), origin);
  const blocked = await fetch(`${url}/api/health`, { headers: { Origin: "https://other.example" } });
  assert.equal(blocked.headers.get("access-control-allow-origin"), null);
  const malformed = await fetch(`${url}/api/health`, {
    method: "POST", headers: { "content-type": "application/json" }, body: "{"
  });
  assert.equal(malformed.status, 400);
  assert.deepEqual(await malformed.json(), { error: "bad-request" });
  assert.equal((await fetch(`${url}/api/health`)).status, 200);

  const host = await connect(url, origin);
  const guest = await connect(url, origin);
  const created = await host.timeout(2000).emitWithAck("room:create", {
    name: "Host", historyProfileId: randomUUID()
  });
  assert.equal(created.ok, true);
  const joined = await guest.timeout(2000).emitWithAck("room:join", {
    name: "Guest", roomCode: created.room.code
  });
  assert.equal(joined.ok, true);
  assert.equal(joined.room.code, created.room.code);
  const publicRoom = JSON.stringify(joined.room);
  assert.equal(publicRoom.includes("sessionToken"), false);
  assert.equal(publicRoom.includes("historyProfileId"), false);
  assert.equal(publicRoom.includes("usedCardIds"), false);
  await assert.rejects(connect(url, "https://other.example"));
  const polling = await connect(url, origin, ["polling"]);
  assert.equal(polling.connected, true);
  await assert.rejects(connect(url, "https://other.example", ["polling"]));

  assert.match(await readFile(clientIndex, "utf8"), /<div id="root"><\/div>/);
  const assets = await readdir(join(clientDirectory, "dist", "assets"));
  const javascript = (await Promise.all(assets.filter((name) => name.endsWith(".js"))
    .map((name) => readFile(join(clientDirectory, "dist", "assets", name), "utf8")))).join("\n");
  assert.equal(javascript.includes("technology_onbellek"), false, "card library leaked into client bundle");

  const previewPort = await freePort();
  preview = spawn(process.execPath, [viteFile, "preview", "--host", "127.0.0.1", "--port", String(previewPort)], {
    cwd: clientDirectory, stdio: "ignore", windowsHide: true
  });
  let roomPage;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      roomPage = await fetch(`http://127.0.0.1:${previewPort}/room/ABC123`);
      break;
    } catch {
      if (preview.exitCode !== null) throw new Error(`Vite preview exited: ${preview.exitCode}`);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  assert.equal(roomPage?.status, 200);
  assert.match(await roomPage.text(), /<div id="root"><\/div>/);
  console.log("Production smoke passed: compiled server, health, CORS, WebSocket, create/join, private data, static build, SPA route.");
} finally {
  for (const socket of sockets) socket.disconnect();
  preview?.kill();
  server?.kill();
  await rm(directory, { recursive: true, force: true });
}
