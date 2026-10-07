import type { FormEvent } from "react";

interface RoomEntryFormsProps {
  playerName: string;
  roomCode: string;
  error: string | null;
  pending: boolean;
  onNameChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  onJoin: (event: FormEvent<HTMLFormElement>) => void;
  onCreate: (event: FormEvent<HTMLFormElement>) => void;
}

export default function RoomEntryForms({ playerName, roomCode, error, pending, onNameChange, onCodeChange, onJoin, onCreate }: RoomEntryFormsProps) {
  return <>
    <form className="room-form join-form" onSubmit={onJoin} noValidate>
      <label htmlFor="player-name">Oyuncu adın</label>
      <input autoComplete="nickname" id="player-name" maxLength={20}
        onChange={(event) => onNameChange(event.target.value)} placeholder="Adını yaz" value={playerName} />
      <label htmlFor="room-code">Oda kodu</label>
      <input autoCapitalize="characters" autoComplete="off" id="room-code" maxLength={6}
        onChange={(event) => onCodeChange(event.target.value.toUpperCase())}
        placeholder="Örn. ABC234" value={roomCode} />
      {error && <p className="validation-message" role="alert">{error}</p>}
      <button className="button button-primary join-button" disabled={pending} type="submit">
        {pending ? "Bağlanıyor…" : "Odaya Katıl"}
      </button>
    </form>

    <div className="divider" aria-hidden="true"><span>veya</span></div>

    <form className="room-form" onSubmit={onCreate} noValidate>
      <button className="button button-secondary create-button" disabled={pending} type="submit">
        {pending ? "Bağlanıyor…" : "Oda Oluştur"}
      </button>
    </form>
  </>;
}
