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

const app = express();
const httpServer = createServer(app);
const port = Number(process.env.PORT ?? 3001);
const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

app.use(cors({ origin: clientOrigin }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  const health: HealthResponse = { status: "ok" };
  response.json(health);
});

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: clientOrigin,
    methods: ["GET", "POST"]
  }
});

registerRoomHandlers(io, new RoomManager());

httpServer.listen(port, () => {
  console.log(`Tabu API listening on http://localhost:${port}`);
});
