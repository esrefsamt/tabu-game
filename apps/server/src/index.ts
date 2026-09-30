import "dotenv/config";
import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  HealthResponse,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from "@tabu/shared";
import { RoomManager } from "./rooms/RoomManager.js";
import { registerRoomHandlers } from "./socket/roomHandlers.js";
import { JsonFileCardHistoryStore } from "./cards/history/CardHistoryStore.js";
import { loadServerConfig, isAllowedOrigin } from "./serverConfig.js";

const config = loadServerConfig();
const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: (origin, callback) => callback(null, isAllowedOrigin(origin, config.clientOrigin)) }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  const health: HealthResponse = { status: "ok" };
  response.json(health);
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error("HTTP request failed.");
  const malformedJson = error instanceof SyntaxError;
  response.status(malformedJson ? 400 : 500).json({ error: malformedJson ? "bad-request" : "internal-error" });
});

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: config.clientOrigin,
    methods: ["GET", "POST"]
  },
  allowRequest: (request, callback) => callback(null, isAllowedOrigin(request.headers.origin, config.clientOrigin))
});

registerRoomHandlers(io, new RoomManager(undefined, new JsonFileCardHistoryStore(config.historyFile)));

httpServer.listen(config.port, () => {
  console.info(`Tabu server listening on port ${config.port} (${config.mode}).`);
  console.info(`Client origin: ${config.clientOrigin}`);
  console.info(`Card history file: ${config.historyFile}`);
});

let shuttingDown = false;
function shutdown(signal: string): void {
  if (shuttingDown) return;
  shuttingDown = true;
  console.info(`Received ${signal}; closing server.`);
  // History writes are synchronous; there is no pending write queue to drain.
  io.close(() => {
    console.info("Server closed.");
    process.exitCode = 0;
  });
  setTimeout(() => {
    console.error("Server shutdown timed out.");
    process.exit(1);
  }, 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
