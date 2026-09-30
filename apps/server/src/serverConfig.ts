import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export interface ServerConfig {
  port: number;
  clientOrigin: string;
  historyFile: string;
  mode: string;
}

export function loadServerConfig(env: NodeJS.ProcessEnv = process.env): ServerConfig {
  const mode = env.NODE_ENV || "development";
  const port = Number(env.PORT ?? 3001);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }
  if (mode === "production" && !env.CLIENT_ORIGIN) {
    throw new Error("CLIENT_ORIGIN is required in production.");
  }
  const origin = new URL(env.CLIENT_ORIGIN || "http://localhost:5173");
  if (!["http:", "https:"].includes(origin.protocol) || origin.pathname !== "/" ||
      origin.search || origin.hash || origin.username || origin.password) {
    throw new Error("CLIENT_ORIGIN must be one HTTP(S) origin without a path or credentials.");
  }
  const defaultHistoryFile = fileURLToPath(new URL("../data/card-history.json", import.meta.url));
  return {
    port,
    clientOrigin: origin.origin,
    historyFile: resolve(env.CARD_HISTORY_FILE || defaultHistoryFile),
    mode
  };
}

export function isAllowedOrigin(origin: string | undefined, clientOrigin: string): boolean {
  // Health checks and native clients may omit Origin. Browser origins must match exactly.
  return origin === undefined || origin === clientOrigin;
}
