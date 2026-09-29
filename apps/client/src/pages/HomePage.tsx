import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { RoomActionResponse, RoomErrorCode } from "@tabu/shared";
import { createRoom, joinRoom } from "../lib/socket";

function errorMessage(error: RoomErrorCode): string {
  switch (error) {
    case "invalid-name":
      return "Geçerli bir oyuncu adı gir.";
    case "invalid-room-code":
      return "Geçerli bir oda kodu gir.";
    case "room-not-found":
      return "Oda bulunamadı.";
    case "room-full":
      return "Oda dolu.";
    case "game-already-started":
      return "Oyun zaten başladı.";
    case "already-in-room":
      return "Zaten bir odadasın. Sayfayı yenileyip tekrar dene.";
    case "server-unavailable":
      return "Sunucuya bağlanılamadı. Lütfen tekrar dene.";
    case "request-timeout":
      return "Sunucudan yanıt alınamadı. Lütfen tekrar dene.";
  }
}

function HomePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState(searchParams.get("room")?.toUpperCase() ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function handleResponse(response: RoomActionResponse): void {
    if (response.ok) {
      navigate(`/room/${response.room.code}`);
    } else {
      setError(errorMessage(response.error));
    }
  }

  async function handleCreateRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = playerName.trim();
    if (name.length === 0 || name.length > 20) {
      setError("Geçerli bir oyuncu adı gir.");
      return;
    }

    setError(null);
    setPending(true);
    handleResponse(await createRoom(name));
    setPending(false);
  }

  async function handleJoinRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = playerName.trim();
    const code = roomCode.trim();
    if (name.length === 0 || name.length > 20) {
      setError("Geçerli bir oyuncu adı gir.");
      return;
    }
    if (code.length === 0) {
      setError("Odaya katılmak için oda kodunu gir.");
      return;
    }

    setError(null);
    setPending(true);
    handleResponse(await joinRoom(name, code));
    setPending(false);
  }

  return (
    <main className="page-shell home-shell">
      <div className="home-layout">
        <section className="home-intro" aria-labelledby="game-title">
          <p className="eyebrow">ARKADAŞLARINLA OYUN ZAMANI</p>
          <h1 className="brand-logo" id="game-title">TABU<span>!</span></h1>
          <p className="home-headline">Kelimeler yasak,<br /><em>eğlence serbest.</em></p>
          <p className="subtitle">Arkadaşlarınla çevrimiçi Tabu oyna. Odanı kur, linki paylaş, oyuna başla.</p>
          <div className="home-card-stack" aria-hidden="true">
            <div className="home-demo-card home-demo-card-back" />
            <div className="home-demo-card home-demo-card-front">
              <span>ANLAT</span>
              <strong>MACERA</strong>
              <i>heyecan · keşif · yolculuk</i>
            </div>
          </div>
        </section>

      <section className="welcome-card" aria-labelledby="entry-title">
        <div className="form-heading">
          <span className="form-heading-icon" aria-hidden="true">✦</span>
          <div>
            <p className="section-overline">OYUN MASASINA HOŞ GELDİN</p>
            <h2 id="entry-title">Bir oda aç, herkesi topla.</h2>
          </div>
        </div>

        <form className="room-form" onSubmit={handleCreateRoom} noValidate>
          <label htmlFor="player-name">Oyuncu adın</label>
          <input
            autoComplete="nickname"
            id="player-name"
            maxLength={20}
            onChange={(event) => {
              setPlayerName(event.target.value);
              setError(null);
            }}
            placeholder="Adını yaz"
            value={playerName}
          />
          {error && <p className="validation-message" role="alert">{error}</p>}
          <button className="button button-primary create-button" disabled={pending} type="submit">
            {pending ? "Bağlanıyor…" : "Oda Oluştur"}
          </button>
        </form>

        <div className="divider" aria-hidden="true"><span>veya</span></div>

        <form className="room-form join-form" onSubmit={handleJoinRoom} noValidate>
          <label htmlFor="room-code">Oda kodu</label>
          <input
            autoCapitalize="characters"
            autoComplete="off"
            id="room-code"
            maxLength={6}
            onChange={(event) => {
              setRoomCode(event.target.value.toUpperCase());
              setError(null);
            }}
            placeholder="Örn. ABC234"
            value={roomCode}
          />
          <button className="button button-secondary join-button" disabled={pending} type="submit">
            {pending ? "Bağlanıyor…" : "Odaya Katıl"}
          </button>
        </form>
      </section>
      </div>
      <p className="page-note">Kelimeyi anlat, yasaklı kelimelere dikkat et.</p>
    </main>
  );
}

export default HomePage;
