import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { RoomState } from "@tabu/shared";
import LobbyTeamBoard from "./LobbyTeamBoard";

const room: RoomState = {
  code: "ABC234",
  players: [
    { id: "host", name: "Host", team: "A", isHost: true, isConnected: true, roomWins: 2 },
    { id: "guest", name: "Guest", team: "B", isHost: false, isConnected: true, roomWins: 0 }
  ],
  captainAId: "host",
  captainBId: "guest",
  settings: { roundDurationSeconds: 60, passLimit: 3, targetScore: 10, cardSelection: { mode: "GENERAL" } },
  game: { phase: "lobby", winnerTeam: null, activeTeam: null, clueGiverId: null, error: null,
    scores: { A: 0, B: 0 }, completedRounds: { A: 0, B: 0 }, isOvertime: false,
    roundId: null, roundEndsAt: null, roundPausedRemainingMs: null, passesUsed: 0, tabuCooldownUntil: null },
  recentEvents: []
};

test("only the host sees kick actions for other players", () => {
  const common = { room, movePending: false, onMove: async () => {}, onKick: () => {} };
  const hostMarkup = renderToStaticMarkup(<LobbyTeamBoard {...common} isHost selfPlayerId="host" />);
  assert.match(hostMarkup, /Guest oyuncusunu odadan at/);
  assert.equal(hostMarkup.includes("Host oyuncusunu odadan at"), false);
  const guestMarkup = renderToStaticMarkup(<LobbyTeamBoard {...common} isHost={false} selfPlayerId="guest" />);
  assert.equal(guestMarkup.includes("oyuncusunu odadan at"), false);
  assert.match(guestMarkup, /2 oda galibiyeti/);
});
