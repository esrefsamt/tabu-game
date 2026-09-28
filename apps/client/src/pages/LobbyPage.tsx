import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import type {
  CardAction,
  CardActionError,
  CaptainActionError,
  GameStartError,
  PassLimit,
  Player,
  RoomState,
  RoundStartError,
  RoundDurationSeconds,
  SettingsActionError,
  Team,
  TeamActionError
} from "@tabu/shared";
import {
  changeTeam, sendCardAction, setCaptain, socket, startGame, startRound,
  updateRoomSettings, usePersonalGameView, useRoomState
} from "../lib/socket";

const ROUND_DURATIONS: RoundDurationSeconds[] = [30, 45, 60, 90, 120];
const PASS_LIMITS: PassLimit[] = [0, 1, 2, 3, 4, 5, 10];

function teamErrorMessage(error: TeamActionError): string {
  switch (error) {
    case "invalid-team":
      return "Takım seçimi geçersiz.";
    case "not-in-room":
      return "Oda bağlantısı bulunamadı. Lütfen odaya yeniden katıl.";
    case "game-already-started":
      return "Oyun başladıktan sonra takım değiştirilemez.";
    case "server-unavailable":
      return "Sunucuya bağlanılamadı. Lütfen tekrar dene.";
    case "request-timeout":
      return "Sunucudan yanıt alınamadı. Lütfen tekrar dene.";
  }
}

function captainErrorMessage(error: CaptainActionError): string {
  switch (error) {
    case "invalid-team":
      return "Geçerli bir takım seç.";
    case "invalid-captain":
      return "Kaptan, seçilen takımın oyuncularından biri olmalı.";
    case "not-in-room":
      return "Oda bağlantısı bulunamadı. Lütfen odaya yeniden katıl.";
    case "not-host":
      return "Kaptanları yalnızca oda sahibi seçebilir.";
    case "game-already-started":
      return "Oyun başladıktan sonra kaptan değiştirilemez.";
    case "server-unavailable":
      return "Sunucuya bağlanılamadı. Lütfen tekrar dene.";
    case "request-timeout":
      return "Sunucudan yanıt alınamadı. Lütfen tekrar dene.";
  }
}

function settingsErrorMessage(error: SettingsActionError): string {
  switch (error) {
    case "invalid-settings":
      return "Geçersiz oyun ayarı.";
    case "not-in-room":
      return "Oda bağlantısı bulunamadı. Lütfen odaya yeniden katıl.";
    case "not-host":
      return "Oyun ayarlarını yalnızca oda sahibi değiştirebilir.";
    case "game-already-started":
      return "Oyun başladıktan sonra ayarlar değiştirilemez.";
    case "server-unavailable":
      return "Sunucuya bağlanılamadı. Lütfen tekrar dene.";
    case "request-timeout":
      return "Sunucudan yanıt alınamadı. Lütfen tekrar dene.";
  }
}

function gameStartErrorMessage(error: GameStartError): string {
  switch (error) {
    case "not-in-room":
      return "Oda bağlantısı bulunamadı. Lütfen odaya yeniden katıl.";
    case "not-host":
      return "Oyunu yalnızca oda sahibi başlatabilir.";
    case "game-already-started":
      return "Oyun zaten başladı.";
    case "not-enough-players":
      return "Oyunu başlatmak için en az 2 oyuncu gerekli.";
    case "teams-incomplete":
      return "Her iki takımda da en az bir oyuncu olmalı.";
    case "captains-required":
      return "Her iki takım için kaptan seçilmelidir.";
    case "players-unassigned":
      return "Tüm oyuncular bir takım seçmelidir.";
    case "server-unavailable":
      return "Sunucuya bağlanılamadı. Lütfen tekrar dene.";
    case "request-timeout":
      return "Sunucudan yanıt alınamadı. Lütfen tekrar dene.";
  }
}

function roundStartErrorMessage(error: RoundStartError): string {
  switch (error) {
    case "not-in-room": return "Oda bağlantısı bulunamadı.";
    case "round-not-ready": return "Tur henüz başlatılamıyor.";
    case "not-clue-giver": return "Turu yalnızca sıradaki anlatıcı başlatabilir.";
    case "team-unavailable": return "Takımlardan birinde oyuncu kalmadı.";
    case "server-unavailable": return "Sunucuya bağlanılamadı. Lütfen tekrar dene.";
    case "request-timeout": return "Sunucudan yanıt alınamadı. Lütfen tekrar dene.";
  }
}

function cardActionErrorMessage(error: CardActionError): string {
  switch (error) {
    case "not-in-room": return "Oda bağlantısı bulunamadı.";
    case "round-not-active": return "Tur sona erdi.";
    case "invalid-action": return "Geçersiz kart işlemi.";
    case "not-authorized": return "Bu işlem için yetkin yok.";
    case "pass-limit-reached": return "Pas hakkın kalmadı.";
    case "stale-card": return "Kart değişti. Güncel kartı kullan.";
    case "server-unavailable": return "Sunucuya bağlanılamadı. Lütfen tekrar dene.";
    case "request-timeout": return "Sunucudan yanıt alınamadı. Lütfen tekrar dene.";
  }
}

function ScoreBoard({ scores }: { scores: RoomState["game"]["scores"] }) {
  return (
    <div className="score-board" aria-label="Takım puanları">
      <p>Takım A: <strong>{scores.A}</strong></p>
      <p>Takım B: <strong>{scores.B}</strong></p>
    </div>
  );
}

function TeamPlayerList({
  players,
  captainId,
  clueGiverId = null
}: {
  players: Player[];
  captainId: string | null;
  clueGiverId?: string | null;
}) {
  if (players.length === 0) {
    return <p className="empty-team">Bu takımda henüz oyuncu yok.</p>;
  }

  return (
    <ul className="player-list team-player-list">
      {players.map((player) => (
        <li className="player-row" key={player.id}>
          <span className="player-name">{player.name}</span>
          <span className="player-badges">
            {player.isHost && <span className="host-badge" aria-label="Oda sahibi">★ Host</span>}
            {player.id === captainId && <span className="captain-badge">Kaptan</span>}
            {player.id === clueGiverId && <span className="clue-giver-badge">Anlatıcı</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

function GamePreparationScreen({ room }: { room: RoomState }) {
  const [roundError, setRoundError] = useState("");
  const [roundPending, setRoundPending] = useState(false);
  const teamAPlayers = room.players.filter((player) => player.team === "A");
  const teamBPlayers = room.players.filter((player) => player.team === "B");
  const clueGiver = room.players.find((player) => player.id === room.game.clueGiverId);
  const activeTeamLabel = room.game.activeTeam === "A" ? "Takım A" : "Takım B";
  const isClueGiver = room.game.clueGiverId === socket.id;

  async function handleStartRound() {
    setRoundError("");
    setRoundPending(true);
    const response = await startRound();
    if (!response.ok) setRoundError(roundStartErrorMessage(response.error));
    setRoundPending(false);
  }

  return (
    <main className="page-shell lobby-shell">
      <section className="game-card" aria-labelledby="game-screen-title">
        <header className="lobby-header">
          <div className="brand-mark lobby-brand" aria-hidden="true">T</div>
          <p className="eyebrow">Oyun hazırlığı</p>
          <h1 id="game-screen-title">TABU</h1>
        </header>

        <ScoreBoard scores={room.game.scores} />

        {room.game.phase === "unable-to-continue" ? (
          <p className="game-unavailable-message" role="alert">
            {activeTeamLabel} için oyuncu kalmadığından oyun devam edemiyor.
          </p>
        ) : (
          <section className="turn-summary" aria-live="polite">
            <p className="active-team-label">Sıra: {activeTeamLabel}</p>
            <p className="clue-giver-name">Anlatıcı: <strong>{clueGiver?.name ?? "Oyuncu bulunamadı"}</strong></p>
          </section>
        )}

        <div className="team-grid game-rosters">
          <section className="team-panel" aria-labelledby="game-team-a-title">
            <div className="team-panel-heading"><h3 id="game-team-a-title">Takım A</h3><span>{teamAPlayers.length}</span></div>
            <TeamPlayerList players={teamAPlayers} captainId={room.captainAId} clueGiverId={room.game.clueGiverId} />
          </section>
          <section className="team-panel" aria-labelledby="game-team-b-title">
            <div className="team-panel-heading"><h3 id="game-team-b-title">Takım B</h3><span>{teamBPlayers.length}</span></div>
            <TeamPlayerList players={teamBPlayers} captainId={room.captainBId} clueGiverId={room.game.clueGiverId} />
          </section>
        </div>

        <section className="game-settings" aria-label="Oyun ayarları">
          <p>Tur süresi: <strong>{room.settings.roundDurationSeconds} saniye</strong></p>
          <p>Pas hakkı: <strong>{room.settings.passLimit}</strong></p>
        </section>
        {room.game.phase === "turn-preparation" && <p className="lobby-hint">Tura hazırlanılıyor</p>}
        {room.game.phase === "turn-preparation" && isClueGiver && (
          <div className="start-game-controls">
            <button className="button button-primary" disabled={roundPending} onClick={() => void handleStartRound()} type="button">
              {roundPending ? "Başlatılıyor…" : "Turu Başlat"}
            </button>
            {roundError && <p className="validation-message" role="alert">{roundError}</p>}
          </div>
        )}
      </section>
    </main>
  );
}

function RoundScreen({ room }: { room: RoomState }) {
  const view = usePersonalGameView();
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [actionPending, setActionPending] = useState(false);
  const [actionError, setActionError] = useState("");
  const currentPlayer = room.players.find((player) => player.id === socket.id);
  const clueGiver = room.players.find((player) => player.id === room.game.clueGiverId);
  const activeTeam = room.game.activeTeam;
  const isClueGiver = socket.id === room.game.clueGiverId;
  const opposingCaptainId = activeTeam === "A" ? room.captainBId : room.captainAId;
  const isOpposingCaptain = currentPlayer?.id === opposingCaptainId && currentPlayer?.team !== activeTeam;
  const isActiveTeammate = currentPlayer?.team === activeTeam && !isClueGiver;
  const canSeeCard = isClueGiver ||
    ((currentPlayer?.team === "A" || currentPlayer?.team === "B") && currentPlayer.team !== activeTeam);
  const visibleCard = canSeeCard && view.roundId === room.game.roundId ? view.currentCard : null;
  const cardVersion = visibleCard ? view.cardVersion : null;
  const passesRemaining = Math.max(0, room.settings.passLimit - room.game.passesUsed);

  useEffect(() => {
    const updateCountdown = () => {
      setRemainingSeconds(Math.max(0, Math.ceil(((room.game.roundEndsAt ?? Date.now()) - Date.now()) / 1000)));
    };
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 250);
    return () => window.clearInterval(interval);
  }, [room.game.roundEndsAt]);

  useEffect(() => { setActionError(""); }, [view.cardVersion]);

  async function act(action: CardAction) {
    if (cardVersion === null || actionPending) return;
    setActionError("");
    setActionPending(true);
    const response = await sendCardAction({ action, cardVersion });
    if (!response.ok) setActionError(cardActionErrorMessage(response.error));
    setActionPending(false);
  }

  return (
    <main className="page-shell lobby-shell">
      <section className="game-card" aria-labelledby="round-title">
        <header className="lobby-header">
          <div className="brand-mark lobby-brand" aria-hidden="true">T</div>
          <p className="eyebrow">Aktif tur</p>
          <h1 id="round-title">TABU</h1>
        </header>
        <ScoreBoard scores={room.game.scores} />
        <div className="round-summary">
          <p className="active-team-label">Sıra: Takım {activeTeam}</p>
          <p className="clue-giver-name">Anlatıcı: <strong>{clueGiver?.name ?? "Oyuncu bulunamadı"}</strong></p>
          <p className="round-countdown" aria-live="off">Süre: <strong>{remainingSeconds}</strong></p>
        </div>

        {isActiveTeammate ? (
          <div className="card-hidden-message">
            <strong>Anlatıcını dinle!</strong>
            <p>Kelime sadece anlatıcı ve rakip takım tarafından görülebilir.</p>
          </div>
        ) : visibleCard ? (
          <article className="tabu-card" aria-label="Tabu kartı">
            <h2>{visibleCard.word}</h2>
            <ul>{visibleCard.forbiddenWords.map((word) => <li key={word}>{word}</li>)}</ul>
          </article>
        ) : (
          <p className="card-loading">Kart bekleniyor…</p>
        )}

        {isClueGiver && (
          <div className="round-controls">
            <div className="round-buttons">
              <button className="button button-primary" disabled={actionPending || cardVersion === null} onClick={() => void act("correct")} type="button">Doğru</button>
              <button className="button button-secondary" disabled={actionPending || cardVersion === null || passesRemaining === 0} onClick={() => void act("pass")} type="button">Pas</button>
              <button className="button button-secondary" disabled={actionPending || cardVersion === null} onClick={() => void act("tabu")} type="button">Tabu</button>
            </div>
            <p className="passes-remaining">Kalan pas: {passesRemaining}</p>
          </div>
        )}
        {!isClueGiver && isOpposingCaptain && (
          <div className="round-controls">
            <button className="button button-secondary" disabled={actionPending || cardVersion === null} onClick={() => void act("tabu")} type="button">Tabu</button>
          </div>
        )}
        {actionError && <p className="validation-message round-error" role="alert">{actionError}</p>}
      </section>
    </main>
  );
}

function LobbyPage() {
  const { roomCode = "" } = useParams();
  const room = useRoomState();
  const [copyMessage, setCopyMessage] = useState("");
  const [teamError, setTeamError] = useState("");
  const [teamPending, setTeamPending] = useState(false);
  const [captainError, setCaptainError] = useState("");
  const [captainPending, setCaptainPending] = useState(false);
  const [settingsError, setSettingsError] = useState("");
  const [settingsPending, setSettingsPending] = useState(false);
  const [gameStartError, setGameStartError] = useState("");
  const [gameStartPending, setGameStartPending] = useState(false);

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

  if (room.game.phase === "round-active") {
    return <RoundScreen room={room} />;
  }

  if (room.game.phase !== "lobby") {
    return <GamePreparationScreen room={room} />;
  }

  const teamAPlayers = room.players.filter((player) => player.team === "A");
  const teamBPlayers = room.players.filter((player) => player.team === "B");
  const unassignedPlayers = room.players.filter((player) => player.team === null);
  const currentPlayer = room.players.find((player) => player.id === socket.id);
  const isHost = currentPlayer?.isHost ?? false;
  const captainA = room.players.find((player) => player.id === room.captainAId);
  const captainB = room.players.find((player) => player.id === room.captainBId);

  async function selectTeam(team: Team) {
    setTeamError("");
    setTeamPending(true);
    const response = await changeTeam(team);
    if (!response.ok) {
      setTeamError(teamErrorMessage(response.error));
    }
    setTeamPending(false);
  }

  async function selectCaptain(team: Team, captainId: string | null) {
    setCaptainError("");
    setCaptainPending(true);
    const response = await setCaptain({ team, captainId });
    if (!response.ok) {
      setCaptainError(captainErrorMessage(response.error));
    }
    setCaptainPending(false);
  }

  async function changeSetting(
    payload:
      | { setting: "roundDurationSeconds"; value: RoundDurationSeconds }
      | { setting: "passLimit"; value: PassLimit }
  ) {
    setSettingsError("");
    setSettingsPending(true);
    const response = await updateRoomSettings(payload);
    if (!response.ok) {
      setSettingsError(settingsErrorMessage(response.error));
    }
    setSettingsPending(false);
  }

  async function handleStartGame() {
    setGameStartError("");
    setGameStartPending(true);
    const response = await startGame();
    if (!response.ok) {
      setGameStartError(gameStartErrorMessage(response.error));
    }
    setGameStartPending(false);
  }

  function handleRoundDurationChange(value: string) {
    const duration = ROUND_DURATIONS.find((option) => String(option) === value);
    if (duration !== undefined) {
      void changeSetting({ setting: "roundDurationSeconds", value: duration });
    }
  }

  function handlePassLimitChange(value: string) {
    const passLimit = PASS_LIMITS.find((option) => String(option) === value);
    if (passLimit !== undefined) {
      void changeSetting({ setting: "passLimit", value: passLimit });
    }
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
            <TeamPlayerList players={teamAPlayers} captainId={room.captainAId} />
          </section>
          <section className={`team-panel${currentPlayer?.team === "B" ? " team-panel-selected" : ""}`} aria-labelledby="team-b-title">
            <div className="team-panel-heading">
              <h3 id="team-b-title">Takım B</h3>
              <span>{teamBPlayers.length}</span>
            </div>
            <TeamPlayerList players={teamBPlayers} captainId={room.captainBId} />
          </section>
        </div>

        <section className="unassigned-panel" aria-labelledby="unassigned-title">
          <div className="team-panel-heading">
            <h3 id="unassigned-title">Takım Seçmedi</h3>
            <span>{unassignedPlayers.length}</span>
          </div>
          <TeamPlayerList players={unassignedPlayers} captainId={null} />
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

        <section className="lobby-section" aria-labelledby="captain-section-title">
          <div className="section-heading">
            <h2 id="captain-section-title">Takım Kaptanları</h2>
          </div>
          {isHost ? (
            <div className="host-controls captain-controls">
              <div className="control-field">
                <label htmlFor="captain-a">Takım A Kaptanı</label>
                <select
                  disabled={captainPending}
                  id="captain-a"
                  onChange={(event) => void selectCaptain("A", event.target.value || null)}
                  value={room.captainAId ?? ""}
                >
                  <option value="">Seçilmedi</option>
                  {teamAPlayers.map((player) => <option key={player.id} value={player.id}>{player.name}</option>)}
                </select>
              </div>
              <div className="control-field">
                <label htmlFor="captain-b">Takım B Kaptanı</label>
                <select
                  disabled={captainPending}
                  id="captain-b"
                  onChange={(event) => void selectCaptain("B", event.target.value || null)}
                  value={room.captainBId ?? ""}
                >
                  <option value="">Seçilmedi</option>
                  {teamBPlayers.map((player) => <option key={player.id} value={player.id}>{player.name}</option>)}
                </select>
              </div>
            </div>
          ) : (
            <div className="captain-readonly">
              <p>Takım A Kaptanı: <strong>{captainA?.name ?? "Seçilmedi"}</strong></p>
              <p>Takım B Kaptanı: <strong>{captainB?.name ?? "Seçilmedi"}</strong></p>
            </div>
          )}
          {captainError && <p className="validation-message" role="alert">{captainError}</p>}
        </section>

        <section className="lobby-section" aria-labelledby="settings-section-title">
          <div className="section-heading">
            <h2 id="settings-section-title">Oyun Ayarları</h2>
          </div>
          {isHost ? (
            <div className="host-controls settings-controls">
              <div className="control-field">
                <label htmlFor="round-duration">Tur süresi</label>
                <select
                  disabled={settingsPending}
                  id="round-duration"
                  onChange={(event) => handleRoundDurationChange(event.target.value)}
                  value={room.settings.roundDurationSeconds}
                >
                  {ROUND_DURATIONS.map((duration) => (
                    <option key={duration} value={duration}>{duration} saniye</option>
                  ))}
                </select>
              </div>
              <div className="control-field">
                <label htmlFor="pass-limit">Pas hakkı</label>
                <select
                  disabled={settingsPending}
                  id="pass-limit"
                  onChange={(event) => handlePassLimitChange(event.target.value)}
                  value={room.settings.passLimit}
                >
                  {PASS_LIMITS.map((limit) => <option key={limit} value={limit}>{limit}</option>)}
                </select>
              </div>
            </div>
          ) : (
            <div className="settings-readonly">
              <p>Tur süresi: <strong>{room.settings.roundDurationSeconds} saniye</strong></p>
              <p>Pas hakkı: <strong>{room.settings.passLimit}</strong></p>
            </div>
          )}
          {settingsError && <p className="validation-message" role="alert">{settingsError}</p>}
        </section>

        <p className="lobby-hint">Arkadaşlarını davet et, katılmalarını bekle.</p>
        {isHost && (
          <div className="start-game-controls">
            <button
              className="button button-primary"
              disabled={gameStartPending}
              onClick={() => void handleStartGame()}
              type="button"
            >
              {gameStartPending ? "Başlatılıyor…" : "Oyunu Başlat"}
            </button>
            {gameStartError && <p className="validation-message" role="alert">{gameStartError}</p>}
          </div>
        )}
      </section>
    </main>
  );
}

export default LobbyPage;
