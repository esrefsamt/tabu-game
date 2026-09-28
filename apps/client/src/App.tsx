import { useState, type FormEvent } from "react";

type FormError = "name" | "room" | null;

function App() {
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState<FormError>(null);

  function handleCreateRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(playerName.trim() ? null : "name");
  }

  function handleJoinRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!playerName.trim()) {
      setError("name");
      return;
    }
    setError(roomCode.trim() ? null : "room");
  }

  return (
    <main className="page-shell">
      <section className="welcome-card" aria-labelledby="game-title">
        <div className="brand-mark" aria-hidden="true">T</div>
        <p className="eyebrow">Arkadaşlarla oyun zamanı</p>
        <h1 id="game-title">TABU</h1>
        <p className="subtitle">Arkadaşlarınla çevrimiçi Tabu oyna</p>

        <form className="room-form" onSubmit={handleCreateRoom} noValidate>
          <label htmlFor="player-name">Oyuncu adın</label>
          <input
            autoComplete="nickname"
            id="player-name"
            maxLength={24}
            onChange={(event) => {
              setPlayerName(event.target.value);
              setError(null);
            }}
            placeholder="Adını yaz"
            value={playerName}
          />
          {error === "name" && (
            <p className="validation-message" role="alert">Devam etmek için oyuncu adını yaz.</p>
          )}
          {error === "room" && (
            <p className="validation-message" role="alert">Devam etmek için oda kodunu yaz.</p>
          )}
          <button className="button button-primary" type="submit">Oda Oluştur</button>
        </form>

        <div className="divider" aria-hidden="true"><span>veya</span></div>

        <form className="room-form join-form" onSubmit={handleJoinRoom} noValidate>
          <label htmlFor="room-code">Oda kodu</label>
          <input
            autoCapitalize="characters"
            id="room-code"
            maxLength={8}
            onChange={(event) => {
              setRoomCode(event.target.value);
              setError(null);
            }}
            placeholder="Örn. ABC123"
            value={roomCode}
          />
          <button className="button button-secondary" type="submit">Odaya Katıl</button>
        </form>
      </section>
      <p className="page-note">Kelimeyi anlat, yasaklı kelimelere dikkat et.</p>
    </main>
  );
}

export default App;
