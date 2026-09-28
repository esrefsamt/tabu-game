import type { PublicGameState, Team } from "@tabu/shared";

type TurnState = Pick<PublicGameState, "phase" | "activeTeam" | "clueGiverId" | "error">;

type TeamPlayers = Record<Team, string[]>;
type TeamIndexes = Record<Team, number>;

export class TurnEngine {
  private readonly teamPlayers: TeamPlayers;
  private readonly nextIndexes: TeamIndexes = { A: 0, B: 0 };
  private gameState: TurnState;

  constructor(teamAPlayerIds: readonly string[], teamBPlayerIds: readonly string[]) {
    if (teamAPlayerIds.length === 0 || teamBPlayerIds.length === 0) {
      throw new Error("A turn engine requires players on both teams.");
    }

    this.teamPlayers = { A: [...teamAPlayerIds], B: [...teamBPlayerIds] };
    this.gameState = {
      phase: "turn-preparation",
      activeTeam: "A",
      clueGiverId: this.nextPlayer("A"),
      error: null
    };
  }

  get publicState(): TurnState {
    return { ...this.gameState };
  }

  advanceTurn(): TurnState {
    if (this.gameState.phase !== "turn-preparation" || !this.gameState.activeTeam) {
      return this.publicState;
    }

    const nextTeam: Team = this.gameState.activeTeam === "A" ? "B" : "A";
    if (this.teamPlayers[nextTeam].length === 0) {
      this.markUnableToContinue(nextTeam);
      return this.publicState;
    }

    this.gameState = {
      phase: "turn-preparation",
      activeTeam: nextTeam,
      clueGiverId: this.nextPlayer(nextTeam),
      error: null
    };
    return this.publicState;
  }

  removePlayer(playerId: string): TurnState {
    const team = this.teamOf(playerId);
    if (!team) {
      return this.publicState;
    }

    const removedIndex = this.teamPlayers[team].indexOf(playerId);
    const nextIndex = this.nextIndexes[team];
    if (removedIndex < nextIndex) {
      this.nextIndexes[team] -= 1;
    }
    this.teamPlayers[team].splice(removedIndex, 1);

    if (this.teamPlayers[team].length === 0) {
      this.markUnableToContinue(team);
      return this.publicState;
    }

    this.nextIndexes[team] %= this.teamPlayers[team].length;
    if (this.gameState.phase === "turn-preparation" &&
        this.gameState.activeTeam === team &&
        this.gameState.clueGiverId === playerId) {
      this.gameState = {
        phase: "turn-preparation",
        activeTeam: team,
        clueGiverId: this.nextPlayer(team),
        error: null
      };
    }

    return this.publicState;
  }

  private teamOf(playerId: string): Team | null {
    if (this.teamPlayers.A.includes(playerId)) return "A";
    if (this.teamPlayers.B.includes(playerId)) return "B";
    return null;
  }

  private nextPlayer(team: Team): string {
    const players = this.teamPlayers[team];
    const index = this.nextIndexes[team] % players.length;
    const playerId = players[index];
    if (!playerId) {
      throw new Error(`Team ${team} has no available clue giver.`);
    }
    this.nextIndexes[team] = (index + 1) % players.length;
    return playerId;
  }

  private markUnableToContinue(emptyTeam: Team): void {
    this.gameState = {
      phase: "unable-to-continue",
      activeTeam: emptyTeam,
      clueGiverId: null,
      error: "team-empty"
    };
  }
}
