import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import type {
  CardAction,
  CardActionError,
  CaptainActionError,
  GameStartError,
  KickPlayerError,
  MovePlayerError,
  MovePlayerPayload,
  PassLimit,
  Player,
  RoomState,
  ReturnToLobbyError,
  RoundStartError,
  RoundDurationSeconds,
  SettingsActionError,
  Team,
  TargetScore,
  UpdateRoomSettingsPayload
} from "@tabu/shared";
import {
  getCurrentPlayerId, getLastKickedRoomCode, hasRoomSession, kickPlayer, leaveRoom, movePlayer, resumeRoom, returnToLobby,
  sendCardAction, setCaptain, socket, startGame, startRound,
  updateRoomSettings, usePersonalGameView, useRoomState
} from "../lib/socket";
import CensoredCard from "../components/CensoredCard";
import LobbyTeamBoard from "../components/LobbyTeamBoard";
import CategorySelector from "../components/CategorySelector";
import { playSound } from "../lib/sound";

const ROUND_DURATIONS: RoundDurationSeconds[] = [30, 45, 60, 90, 120];
const PASS_LIMITS: PassLimit[] = [0, 1, 2, 3, 4, 5, 10];
const TARGET_SCORES: TargetScore[] = [10, 15, 20, 25, 30, 40, 50];

function moveErrorMessage(error: MovePlayerError): string {
  switch (error) {
    case "invalid-team":
      return "Hedef takım geçersiz.";
    case "invalid-player":
      return "Oyuncu bu odada bulunamadı.";
    case "not-in-room":
      return "Oda bağlantısı bulunamadı. Lütfen odaya yeniden katıl.";
    case "not-host":
      return "Oyuncuları yalnızca oda sahibi taşıyabilir.";
    case "game-already-started":
      return "Oyun başladıktan sonra takım değiştirilemez.";
    case "server-unavailable":
      return "Sunucuya bağlanılamadı. Lütfen tekrar dene.";
    case "request-timeout":
      return "Sunucudan yanıt alınamadı. Lütfen tekrar dene.";
  }
}

function kickErrorMessage(error: KickPlayerError): string {
  switch (error) {
    case "not-in-room": return "Oda bağlantısı bulunamadı.";
    case "not-host": return "Oyuncuyu yalnızca oda sahibi çıkarabilir.";
    case "game-already-started": return "Oyun sırasında oyuncu çıkarılamaz.";
    case "invalid-player": return "Oyuncu bu odada bulunamadı.";
    case "cannot-kick-self": return "Kendini odadan atamazsın.";
    case "server-unavailable": return "Sunucuya bağlanılamadı. Lütfen tekrar dene.";
    case "request-timeout": return "Sunucudan yanıt alınamadı. Lütfen tekrar dene.";
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
      return "Oyuna başlamadan önce oda sahibi tüm oyuncuları takımlara yerleştirmeli.";
    case "server-unavailable":
      return "Sunucuya bağlanılamadı. Lütfen tekrar dene.";
    case "request-timeout":
      return "Sunucudan yanıt alınamadı. Lütfen tekrar dene.";
  }
}

function returnToLobbyErrorMessage(error: ReturnToLobbyError): string {
  switch (error) {
    case "not-in-room": return "Oda bağlantısı bulunamadı.";
    case "not-host": return "Yeni maçı yalnızca oda sahibi hazırlayabilir.";
    case "game-not-over": return "Maç henüz sona ermedi.";
    case "server-unavailable": return "Sunucuya bağlanılamadı. Lütfen tekrar dene.";
    case "request-timeout": return "Sunucudan yanıt alınamadı. Lütfen tekrar dene.";
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
    case "tabu-cooldown": return "Faul için kısa bir süre bekle.";
    case "server-unavailable": return "Sunucuya bağlanılamadı. Lütfen tekrar dene.";
    case "request-timeout": return "Sunucudan yanıt alınamadı. Lütfen tekrar dene.";
  }
}

function ScoreBoard({ scores, completedRounds, activeTeam, targetScore }: {
  scores: RoomState["game"]["scores"];
  completedRounds: RoomState["game"]["completedRounds"];
  activeTeam: Team | null;
  targetScore: TargetScore;
}) {
  return (
    <div className="score-area">
      <div className="score-board" aria-label="Takım puanları">
        <div className={`score-team score-team-a${activeTeam === "A" ? " score-team-active" : ""}`}>
          <span>TAKIM A</span><strong>{scores.A}</strong><small>{completedRounds.A} tur</small>
        </div>
        <div className={`score-team score-team-b${activeTeam === "B" ? " score-team-active" : ""}`}>
          <span>TAKIM B</span><strong>{scores.B}</strong><small>{completedRounds.B} tur</small>
        </div>
      </div>
      <p className="target-score-label">Hedef puan: <strong>{targetScore}</strong></p>
    </div>
  );
}

function MatchHistory({ events }: { events: RoomState["recentEvents"] }) {
  return (
    <section className="match-history" aria-label="Son Hareketler">
      <h3>Son Hareketler</h3>
      {events.length === 0 ? <p className="match-history-empty">Henüz hareket yok.</p> : (
        <ol className="match-history-list">
          {[...events].reverse().map((event) => (
            <li className={`match-history-entry history-${event.type}`} key={event.id}>
              <span className="history-mark" aria-hidden="true" />
              <span>{event.text}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function WinnerScreen({ room }: { room: RoomState }) {
  const winner = room.game.winnerTeam;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const isHost = room.players.some((player) => player.id === getCurrentPlayerId() && player.isHost);
  if (winner === null) return null;

  async function handleReturnToLobby() {
    setError("");
    setPending(true);
    const response = await returnToLobby();
    if (!response.ok) setError(returnToLobbyErrorMessage(response.error));
    setPending(false);
  }

  return (
    <main className="page-shell lobby-shell">
      <section className={`game-card winner-screen winner-team-${winner}`} aria-labelledby="winner-title">
        <header className="lobby-header">
          <p className="eyebrow">OYUN SONA ERDİ</p>
          <h1 className="brand-logo brand-logo-game">TABU<span>!</span></h1>
        </header>
        <div className="winner-hero">
          <span className="winner-trophy" aria-hidden="true">🏆</span>
          <p className="turn-kicker">TEBRİKLER!</p>
          <h2 id="winner-title">TAKIM {winner} KAZANDI!</h2>
          <p>Eşit sayıda tur sonunda en yüksek puanı alan takım kazandı.</p>
        </div>
        <ScoreBoard scores={room.game.scores} completedRounds={room.game.completedRounds} activeTeam={winner} targetScore={room.settings.targetScore} />
        <p className="winner-final-label">FİNAL SKORU</p>
        <p className="winner-final-score">{room.game.scores.A} <span>–</span> {room.game.scores.B}</p>
        <MatchHistory events={room.recentEvents} />
        <div className="rematch-action">
          {isHost ? (
            <>
              <button className="button button-primary" disabled={pending} onClick={() => void handleReturnToLobby()} type="button">
                {pending ? "Lobiye dönülüyor…" : "Tekrar Oyna"}
              </button>
              {error && <p className="validation-message" role="alert">{error}</p>}
            </>
          ) : (
            <p>Oda sahibinin yeni maçı hazırlaması bekleniyor.</p>
          )}
        </div>
      </section>
    </main>
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
          <span className="game-player-avatar" aria-hidden="true">{player.name.trim().charAt(0).toLocaleUpperCase("tr-TR")}</span>
          <span className="player-name">{player.name}</span>
          <span className="room-wins" aria-label={`${player.roomWins} oda galibiyeti`}>🏆 {player.roomWins}</span>
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
  const isClueGiver = room.game.clueGiverId === getCurrentPlayerId();

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
          <p className="eyebrow">SIRADAKİ TUR</p>
          <h1 className="brand-logo brand-logo-game" id="game-screen-title">TABU<span>!</span></h1>
        </header>

        <ScoreBoard scores={room.game.scores} completedRounds={room.game.completedRounds} activeTeam={room.game.activeTeam} targetScore={room.settings.targetScore} />
        {room.game.isOvertime && <p className="overtime-message" role="status">Uzatma · Takımlar eşit sayıda tur oynayacak.</p>}

        {room.game.phase === "unable-to-continue" ? (
          <p className="game-unavailable-message" role="alert">
            {activeTeamLabel} için oyuncu kalmadığından oyun devam edemiyor.
          </p>
        ) : (
          <section className="turn-summary" aria-live="polite">
            <p className="turn-kicker">HAZIRLIK ZAMANI</p>
            <p className="active-team-label">Sıra {activeTeamLabel}{room.game.activeTeam === "A" ? "'da" : "'de"}</p>
            <p className="clue-giver-name">Anlatıcı <strong>{clueGiver?.name ?? "Oyuncu bulunamadı"}</strong></p>
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

        <MatchHistory events={room.recentEvents} />
        <section className="game-settings" aria-label="Oyun ayarları">
          <p>Tur süresi: <strong>{room.settings.roundDurationSeconds} saniye</strong></p>
          <p>Pas hakkı: <strong>{room.settings.passLimit}</strong></p>
          <p>Hedef puan: <strong>{room.settings.targetScore}</strong></p>
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
  const navigate = useNavigate();
  const view = usePersonalGameView();
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [actionPending, setActionPending] = useState(false);
  const [actionError, setActionError] = useState("");
  const currentPlayer = room.players.find((player) => player.id === getCurrentPlayerId());
  const clueGiver = room.players.find((player) => player.id === room.game.clueGiverId);
  const activeTeam = room.game.activeTeam;
  const isClueGiver = getCurrentPlayerId() === room.game.clueGiverId;
  const opposingCaptainId = activeTeam === "A" ? room.captainBId : room.captainAId;
  const isOpposingCaptain = currentPlayer?.id === opposingCaptainId && currentPlayer?.team !== activeTeam;
  const isActiveTeammate = currentPlayer?.team === activeTeam && !isClueGiver;
  const canSeeCard = isClueGiver ||
    ((currentPlayer?.team === "A" || currentPlayer?.team === "B") && currentPlayer.team !== activeTeam);
  const visibleCard = canSeeCard && view.roundId === room.game.roundId ? view.currentCard : null;
  const cardVersion = visibleCard ? view.cardVersion : null;
  const passesRemaining = Math.max(0, room.settings.passLimit - room.game.passesUsed);
  const isPaused = room.game.roundPausedRemainingMs !== null;
  const tabuCooling = room.game.tabuCooldownUntil !== null && now < room.game.tabuCooldownUntil;
  const teamAPlayers = room.players.filter((player) => player.team === "A");
  const teamBPlayers = room.players.filter((player) => player.team === "B");

  useEffect(() => {
    setNow(Date.now());
    const until = room.game.tabuCooldownUntil;
    if (until === null || until <= Date.now()) return undefined;
    const timer = window.setTimeout(() => setNow(Date.now()), until - Date.now() + 10);
    return () => window.clearTimeout(timer);
  }, [room.game.tabuCooldownUntil]);

  useEffect(() => {
    if (room.game.roundPausedRemainingMs !== null) {
      setRemainingSeconds(Math.ceil(room.game.roundPausedRemainingMs / 1000));
      return undefined;
    }
    const updateCountdown = () => {
      setRemainingSeconds(Math.max(0, Math.ceil(((room.game.roundEndsAt ?? Date.now()) - Date.now()) / 1000)));
    };
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 250);
    return () => window.clearInterval(interval);
  }, [room.game.roundEndsAt, room.game.roundPausedRemainingMs]);

  useEffect(() => { setActionError(""); }, [view.cardVersion]);

  async function act(action: CardAction) {
    if (cardVersion === null || actionPending || isPaused || (action === "tabu" && tabuCooling)) return;
    setActionError("");
    setActionPending(true);
    const response = await sendCardAction({ action, cardVersion });
    if (!response.ok) setActionError(cardActionErrorMessage(response.error));
    setActionPending(false);
  }

  return (
    <main className="page-shell lobby-shell">
      <section className="game-card match-game-card" aria-labelledby="round-title">
        <header className="lobby-header">
          <p className="eyebrow">OYUN DEVAM EDİYOR</p>
          <h1 className="brand-logo brand-logo-game" id="round-title">TABU<span>!</span></h1>
        </header>
        <ScoreBoard scores={room.game.scores} completedRounds={room.game.completedRounds} activeTeam={activeTeam} targetScore={room.settings.targetScore} />
        {room.game.isOvertime && <p className="overtime-message" role="status">Uzatma · Birer tur daha oynanıyor.</p>}
        <div className={`round-summary round-team-${activeTeam}`}>
          <div>
            <p className="turn-kicker">ŞİMDİ ANLATIYOR</p>
            <p className="active-team-label">Takım {activeTeam}</p>
            <p className="clue-giver-name">Anlatıcı <strong>{clueGiver?.name ?? "Oyuncu bulunamadı"}</strong></p>
          </div>
          <div className={`round-countdown${remainingSeconds <= 10 ? " round-countdown-low" : ""}`} aria-label={`Kalan süre ${remainingSeconds} saniye`}>
            <strong>{remainingSeconds}</strong><span>SANİYE</span>
          </div>
        </div>

        <div className="match-stage">
          <section className="team-panel match-team-a" aria-label="Takım A oyuncuları">
            <div className="team-panel-heading"><h3>Takım A</h3><span>{teamAPlayers.length} oyuncu</span></div>
            <TeamPlayerList players={teamAPlayers} captainId={room.captainAId} clueGiverId={room.game.clueGiverId} />
          </section>
          <div className="match-center">
        {isPaused && <p className="round-reconnecting" role="status">Anlatıcı yeniden bağlanıyor…</p>}

        {isActiveTeammate ? (
          <CensoredCard />
        ) : visibleCard ? (
          <article className="tabu-card" key={visibleCard.id} aria-label="Tabu kartı">
            <div className="tabu-card-top"><p>ANLATILACAK KELİME</p><h2>{visibleCard.word}</h2></div>
            <div className="tabu-card-words"><p>SÖYLEME!</p><ul>{visibleCard.forbiddenWords.map((word) => <li key={word}>{word}</li>)}</ul></div>
          </article>
        ) : (
          <p className="card-loading">Kart bekleniyor…</p>
        )}

        {isClueGiver && (
          <div className="round-controls">
            <div className="round-buttons">
              <button className="button button-correct" disabled={isPaused || actionPending || cardVersion === null} onClick={() => void act("correct")} type="button">✓ Doğru</button>
              <button className="button button-pass" disabled={isPaused || actionPending || cardVersion === null || passesRemaining === 0} onClick={() => void act("pass")} type="button">→ Pas</button>
              <button className="button button-tabu" disabled={isPaused || actionPending || cardVersion === null || tabuCooling} onClick={() => void act("tabu")} type="button">! Tabu</button>
            </div>
            <p className="passes-remaining">Kalan pas: {passesRemaining}</p>
          </div>
        )}
        {!isClueGiver && isOpposingCaptain && (
          <div className="round-controls">
            <button className="button button-tabu" disabled={isPaused || actionPending || cardVersion === null || tabuCooling} onClick={() => void act("tabu")} type="button">! Tabu</button>
          </div>
        )}
        {actionError && <p className="validation-message round-error" role="alert">{actionError}</p>}
        <MatchHistory events={room.recentEvents} />
          </div>
          <section className="team-panel match-team-b" aria-label="Takım B oyuncuları">
            <div className="team-panel-heading"><h3>Takım B</h3><span>{teamBPlayers.length} oyuncu</span></div>
            <TeamPlayerList players={teamBPlayers} captainId={room.captainBId} clueGiverId={room.game.clueGiverId} />
          </section>
        </div>
        <button className="button button-secondary" type="button" onClick={() => void leaveRoom().then(() => navigate("/"))}>Odadan Ayrıl</button>
      </section>
    </main>
  );
}

function LobbyPage() {
  const { roomCode = "" } = useParams();
  const navigate = useNavigate();
  const room = useRoomState();
  const [recovery, setRecovery] = useState<"pending" | "missing" | "invalid" | "moved">("pending");
  const [copyMessage, setCopyMessage] = useState("");
  const [moveError, setMoveError] = useState("");
  const [movePending, setMovePending] = useState(false);
  const [captainError, setCaptainError] = useState("");
  const [captainPending, setCaptainPending] = useState(false);
  const [settingsError, setSettingsError] = useState("");
  const [settingsPending, setSettingsPending] = useState(false);
  const [gameStartError, setGameStartError] = useState("");
  const [gameStartPending, setGameStartPending] = useState(false);
  const [kickTargetId, setKickTargetId] = useState<string | null>(null);
  const [kickPending, setKickPending] = useState(false);
  const [kickError, setKickError] = useState("");
  const previousGame = useRef<{ phase: RoomState["game"]["phase"]; roundId: number | null } | null>(null);

  useEffect(() => {
    let mounted = true;
    let retryTimer: number | null = null;
    const code = roomCode.toUpperCase();
    const attempt = async () => {
      if (recovery === "moved" || !mounted) return;
      if (!hasRoomSession(code)) {
        if (mounted && !room) setRecovery("missing");
        return;
      }
      const result = await resumeRoom(code);
      if (mounted && result === "invalid") setRecovery("invalid");
      if (mounted && result === "unavailable" && socket.connected) {
        retryTimer = window.setTimeout(() => void attempt(), 500);
      }
    };
    const moved = () => { if (mounted) setRecovery("moved"); };
    socket.on("connect", attempt);
    socket.on("room:session-moved", moved);
    void attempt();
    return () => {
      mounted = false;
      if (retryTimer !== null) window.clearTimeout(retryTimer);
      socket.off("connect", attempt);
      socket.off("room:session-moved", moved);
    };
  }, [roomCode, recovery, room]);

  useEffect(() => {
    const game = room?.game;
    if (!game) { previousGame.current = null; return; }
    const previous = previousGame.current;
    if (previous && game.phase === "round-active" && (previous.phase !== "round-active" || previous.roundId !== game.roundId)) playSound("round");
    if (previous && game.phase === "game-over" && previous.phase !== "game-over") playSound("win");
    previousGame.current = { phase: game.phase, roundId: game.roundId };
  }, [room?.game.phase, room?.game.roundId]);

  useEffect(() => {
    if (!copyMessage) {
      return undefined;
    }
    const timer = window.setTimeout(() => setCopyMessage(""), 1800);
    return () => window.clearTimeout(timer);
  }, [copyMessage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [room?.game.phase]);

  if (!room || room.code !== roomCode.toUpperCase()) {
    if (getLastKickedRoomCode() === roomCode.toUpperCase()) {
      return <Navigate to={`/?room=${encodeURIComponent(roomCode.toUpperCase())}&kicked=1`} replace />;
    }
    if (recovery === "missing") {
      return <Navigate to={`/?room=${encodeURIComponent(roomCode.toUpperCase())}`} replace />;
    }
    if (recovery === "moved") {
      return <Navigate to={`/?room=${encodeURIComponent(roomCode.toUpperCase())}&sessionMoved=1`} replace />;
    }
    if (recovery === "invalid") {
      return <Navigate to={`/?room=${encodeURIComponent(roomCode.toUpperCase())}&sessionExpired=1`} replace />;
    }
    return <main className="page-shell lobby-shell"><section className="game-card" role="status">Bağlantı yeniden kuruluyor…</section></main>;
  }

  if (room.game.phase === "round-active") {
    return <RoundScreen room={room} />;
  }

  if (room.game.phase === "game-over") {
    return <WinnerScreen room={room} />;
  }

  if (room.game.phase !== "lobby") {
    return <GamePreparationScreen room={room} />;
  }

  const teamAPlayers = room.players.filter((player) => player.team === "A");
  const teamBPlayers = room.players.filter((player) => player.team === "B");
  const currentPlayer = room.players.find((player) => player.id === getCurrentPlayerId());
  const isHost = currentPlayer?.isHost ?? false;
  const captainA = room.players.find((player) => player.id === room.captainAId);
  const captainB = room.players.find((player) => player.id === room.captainBId);

  async function handleMove(payload: MovePlayerPayload) {
    setMoveError("");
    setMovePending(true);
    const response = await movePlayer(payload);
    if (!response.ok) {
      setMoveError(moveErrorMessage(response.error));
    } else {
      setGameStartError("");
    }
    setMovePending(false);
  }

  async function confirmKick() {
    if (!kickTargetId) return;
    setKickError("");
    setKickPending(true);
    const response = await kickPlayer({ playerId: kickTargetId });
    if (response.ok) setKickTargetId(null);
    else setKickError(kickErrorMessage(response.error));
    setKickPending(false);
  }

  async function selectCaptain(team: Team, captainId: string | null) {
    setCaptainError("");
    setCaptainPending(true);
    const response = await setCaptain({ team, captainId });
    if (!response.ok) {
      setCaptainError(captainErrorMessage(response.error));
    } else {
      setGameStartError("");
    }
    setCaptainPending(false);
  }

  async function changeSetting(payload: UpdateRoomSettingsPayload) {
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

  function handleTargetScoreChange(value: string) {
    const targetScore = TARGET_SCORES.find((option) => String(option) === value);
    if (targetScore !== undefined) {
      void changeSetting({ setting: "targetScore", value: targetScore });
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
      <div className="lobby-layout">
        <header className="lobby-top">
          <div>
            <p className="eyebrow">ARKADAŞLARINLA TABU</p>
            <h1 className="brand-logo brand-logo-small" id="lobby-title">TABU<span>!</span></h1>
            <p className="lobby-top-subtitle">Oda hazır. Takımları kur, kaptanları seç ve oyunu başlat.</p>
          </div>
          <div className="room-share">
            <div>
              <p className="section-label">ODA KODU</p>
              <p className="room-code">{room.code}</p>
            </div>
            <button className="button button-secondary copy-button" onClick={copyRoomLink} type="button">
              Linki Kopyala
            </button>
          </div>
        </header>
        <p className="copy-message" aria-live="polite">{copyMessage}</p>
        <button className="button button-secondary" type="button" onClick={() => void leaveRoom().then(() => navigate("/"))}>Odadan Ayrıl</button>
        {isHost && <p className="history-note">Kart geçmişi bu cihazda hatırlanıyor.</p>}

        <section className="lobby-board-section" aria-labelledby="players-title">
          <div className="section-heading">
            <div>
              <p className="section-overline">LOBI</p>
              <h2 id="players-title">Oyuncular <span className="heading-count">{room.players.length}/10</span></h2>
            </div>
            <p className="section-note">{isHost ? "Oyuncu kartlarını takımlara sürükle." : "Takımları oda sahibi düzenliyor."}</p>
          </div>
          <LobbyTeamBoard room={room} isHost={isHost} movePending={movePending}
            selfPlayerId={getCurrentPlayerId()} onMove={handleMove}
            onKick={(playerId) => { setKickError(""); setKickTargetId(playerId); }} />
          {isHost && kickTargetId && (
            <div className="kick-confirmation" role="dialog" aria-label="Oyuncuyu odadan çıkar">
              <p><strong>{room.players.find((player) => player.id === kickTargetId)?.name ?? "Oyuncu"}</strong> odadan çıkarılsın mı?</p>
              <div className="kick-confirmation-actions">
                <button className="button button-secondary" type="button" disabled={kickPending}
                  onClick={() => setKickTargetId(null)}>İptal</button>
                <button className="button button-primary" type="button" disabled={kickPending}
                  onClick={() => void confirmKick()}>{kickPending ? "Çıkarılıyor…" : "Odadan At"}</button>
              </div>
              {kickError && <p className="validation-message" role="alert">{kickError}</p>}
            </div>
          )}
          {moveError && <p className="validation-message" role="alert">{moveError}</p>}
        </section>

        <div className="lobby-config-grid">
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
              <div className="control-field">
                <label htmlFor="target-score">Hedef puan</label>
                <select
                  disabled={settingsPending}
                  id="target-score"
                  onChange={(event) => handleTargetScoreChange(event.target.value)}
                  value={room.settings.targetScore}
                >
                  {TARGET_SCORES.map((score) => <option key={score} value={score}>{score}</option>)}
                </select>
              </div>
            </div>
          ) : (
            <div className="settings-readonly">
              <p>Tur süresi: <strong>{room.settings.roundDurationSeconds} saniye</strong></p>
              <p>Pas hakkı: <strong>{room.settings.passLimit}</strong></p>
              <p>Hedef puan: <strong>{room.settings.targetScore}</strong></p>
            </div>
          )}
          {settingsError && <p className="validation-message" role="alert">{settingsError}</p>}
        </section>
        </div>
        <CategorySelector selection={room.settings.cardSelection} isHost={isHost} pending={settingsPending} onChange={(selection) => void changeSetting({ setting: "cardSelection", value: selection })} />

        <section className="lobby-start-panel">
          <div>
            <p className="section-overline">HAZIR MISINIZ?</p>
            <h2>Herkes yerini aldı mı?</h2>
            <p>{isHost ? "İki takımda da oyuncu ve kaptan olduğunda oyunu başlatabilirsin." : "Oda sahibinin oyunu başlatmasını bekle."}</p>
          </div>
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
      </div>
    </main>
  );
}

export default LobbyPage;
