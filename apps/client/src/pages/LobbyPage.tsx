import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import type { Player, Team, TeamActionError } from "@tabu/shared";
import { changeTeam, socket, useRoomState } from "../lib/socket";

function teamErrorMessage(error: TeamActionError): string {
  switch (error) {
    case "invalid-team":
      return "Takım seçimi geçersiz.";
    case "not-in-room":
      return "Oda bağlantısı bulunamadı. Lütfen odaya yeniden katıl.";
    case "server-unavailable":
      return "Sunucuya bağlanılamadı. Lütfen tekrar dene.";
    case "request-timeout":
      return "Sunucudan yanıt alınamadı. Lütfen tekrar dene.";
  }
}

function TeamPlayerList({ players }: { players: Player[] }) {
  if (players.length === 0) {
    return <p className="empty-team">Bu takımda henüz oyuncu yok.</p>;
  }

  return (
    <ul className="player-list team-player-list">
      {players.map((player) => (
        <li className="player-row" key={player.id}>
          <span className="player-name">{player.name}</span>
          {player.isHost && <span className="host-badge" aria-label="Oda sahibi">★ Host</span>}
        </li>
      ))}
    </ul>
  );
}

function LobbyPage() {
  const { roomCode = "" } = useParams();
  const room = useRoomState();
  const [copyMessage, setCopyMessage] = useState("");
  const [teamError, setTeamError] = useState("");
  const [teamPending, setTeamPending] = useState(false);

  useEffect(() => {
    if (!copyMessage) {
      return undefined;
    }
    const timer = window.setTimeout(() => setCopyMessage(""), 1800);
    return () => window.clearTimeout(timer);
  }, [copyMessage]);

  if (!room || room.code !== roomCode.toUpperCase()) {
    return <Navigate to={`/?room=${encodeURIComponent(roomCode.toUpperCase())}`} replace />;
  }

  const teamAPlayers = room.players.filter((player) => player.team === "A");
  const teamBPlayers = room.players.filter((player) => player.team === "B");
  const unassignedPlayers = room.players.filter((player) => player.team === null);
  const currentPlayer = room.players.find((player) => player.id === socket.id);

  async function selectTeam(team: Team) {
    setTeamError("");
    setTeamPending(true);
    const response = await changeTeam(team);
    if (!response.ok) {
      setTeamError(teamErrorMessage(response.error));
    }
    setTeamPending(false);
  }

  async function copyRoomLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyMessage("Link kopyalandı");
    } catch {
      setCopyMessage("Link kopyalanamadı. Tarayıcı izinlerini kontrol et.");
    }
  }

  return (
    <main className="page-shell lobby-shell">
      <section className="lobby-card" aria-labelledby="lobby-title">
        <div className="lobby-header">
          <div className="brand-mark lobby-brand" aria-hidden="true">T</div>
          <p className="eyebrow">Oda lobisi</p>
          <h1 id="lobby-title">TABU</h1>
        </div>

        <div className="room-share">
          <div>
            <p className="section-label">Oda kodu</p>
            <p className="room-code">{room.code}</p>
          </div>
          <button className="button button-secondary copy-button" onClick={copyRoomLink} type="button">
            Linki Kopyala
          </button>
        </div>
        <p className="copy-message" aria-live="polite">{copyMessage}</p>

        <div className="players-heading">
          <h2>Oyuncular ({room.players.length}/10)</h2>
        </div>

        <div className="team-grid">
          <section className={`team-panel${currentPlayer?.team === "A" ? " team-panel-selected" : ""}`} aria-labelledby="team-a-title">
            <div className="team-panel-heading">
              <h3 id="team-a-title">Takım A</h3>
              <span>{teamAPlayers.length}</span>
            </div>
            <TeamPlayerList players={teamAPlayers} />
          </section>
          <section className={`team-panel${currentPlayer?.team === "B" ? " team-panel-selected" : ""}`} aria-labelledby="team-b-title">
            <div className="team-panel-heading">
              <h3 id="team-b-title">Takım B</h3>
              <span>{teamBPlayers.length}</span>
            </div>
            <TeamPlayerList players={teamBPlayers} />
          </section>
        </div>

        <section className="unassigned-panel" aria-labelledby="unassigned-title">
          <div className="team-panel-heading">
            <h3 id="unassigned-title">Takım Seçmedi</h3>
            <span>{unassignedPlayers.length}</span>
          </div>
          <TeamPlayerList players={unassignedPlayers} />
        </section>

        <div className="team-selection">
          <p className="team-current" aria-live="polite">
            {currentPlayer?.team === "A"
              ? "Sen Takım A'dasın."
              : currentPlayer?.team === "B"
                ? "Sen Takım B'desin."
                : "Henüz bir takım seçmedin."}
          </p>
          <div className="team-buttons">
            <button
              aria-pressed={currentPlayer?.team === "A"}
              className={`button team-choice${currentPlayer?.team === "A" ? " team-choice-selected" : ""}`}
              disabled={teamPending || currentPlayer?.team === "A"}
              onClick={() => void selectTeam("A")}
              type="button"
            >
              Takım A'ya Katıl
            </button>
            <button
              aria-pressed={currentPlayer?.team === "B"}
              className={`button team-choice${currentPlayer?.team === "B" ? " team-choice-selected" : ""}`}
              disabled={teamPending || currentPlayer?.team === "B"}
              onClick={() => void selectTeam("B")}
              type="button"
            >
              Takım B'ye Katıl
            </button>
          </div>
          {teamError && <p className="validation-message" role="alert">{teamError}</p>}
        </div>
        <p className="lobby-hint">Arkadaşlarını davet et, katılmalarını bekle.</p>
      </section>
    </main>
  );
}

export default LobbyPage;
