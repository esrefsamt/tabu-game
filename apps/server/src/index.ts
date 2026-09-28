import "dotenv/config";
import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import type { HealthResponse } from "@tabu/shared";

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

const io = new Server(httpServer, {
  cors: {
    origin: clientOrigin,
    methods: ["GET", "POST"]
  }
});

// Socket.IO is ready for a later phase; game and lobby events are intentionally absent.
io.on("connection", () => undefined);

httpServer.listen(port, () => {
  console.log(`Tabu API listening on http://localhost:${port}`);
});
