import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { RoomActionResponse, RoomErrorCode } from "@tabu/shared";
import { createRoom, joinRoom } from "../lib/socket";
import RoomEntryForms from "../components/RoomEntryForms";
import { inviteRoomCode } from "../lib/inviteRoomCode";

function errorMessage(error: RoomErrorCode): string {
  switch (error) {
    case "invalid-name":
      return "Geçerli bir oyuncu adı gir.";
    case "invalid-history-profile":
      return "Kart geçmişi profili oluşturulamadı. Lütfen tekrar dene.";
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
  const [roomCode, setRoomCode] = useState(inviteRoomCode(searchParams));
  const [error, setError] = useState<string | null>(
    searchParams.has("sessionMoved") ? "Oturum başka sekmede açıldı. Devam etmek için tekrar katıl."
      : searchParams.has("sessionExpired") ? "Oturum süresi doldu. Odaya tekrar katıl."
        : searchParams.has("kicked") ? "Host tarafından odadan çıkarıldın." : null
  );
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

        <RoomEntryForms playerName={playerName} roomCode={roomCode} error={error} pending={pending}
          onNameChange={(value) => { setPlayerName(value); setError(null); }}
          onCodeChange={(value) => { setRoomCode(value); setError(null); }}
          onJoin={(event) => { void handleJoinRoom(event); }}
          onCreate={(event) => { void handleCreateRoom(event); }} />
      </section>
      </div>
      <p className="page-note">Kelimeyi anlat, yasaklı kelimelere dikkat et.</p>
    </main>
  );
}

export default HomePage;
