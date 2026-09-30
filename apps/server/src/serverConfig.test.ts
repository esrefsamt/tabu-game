import assert from "node:assert/strict";
import { join } from "node:path";
import test from "node:test";
import { isAllowedOrigin, loadServerConfig } from "./serverConfig.js";

test("production requires an explicit client origin", () => {
  assert.throws(() => loadServerConfig({ NODE_ENV: "production" }), /CLIENT_ORIGIN/);
  const config = loadServerConfig({
    NODE_ENV: "production", PORT: "4100",
    CLIENT_ORIGIN: "https://tabu.example", CARD_HISTORY_FILE: "./persistent/history.json"
  });
  assert.equal(config.port, 4100);
  assert.equal(config.clientOrigin, "https://tabu.example");
  assert.equal(config.historyFile, join(process.cwd(), "persistent", "history.json"));
});

test("configured origin is accepted and an unexpected browser origin is rejected", () => {
  assert.equal(isAllowedOrigin("https://tabu.example", "https://tabu.example"), true);
  assert.equal(isAllowedOrigin("https://other.example", "https://tabu.example"), false);
  assert.equal(isAllowedOrigin(undefined, "https://tabu.example"), true);
  assert.throws(() => loadServerConfig({ CLIENT_ORIGIN: "https://tabu.example/path" }), /CLIENT_ORIGIN/);
});
