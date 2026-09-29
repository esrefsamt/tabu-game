import { isSoundEnabled, playSound, setSoundEnabled, unlockAudio, useSoundEnabled } from "../lib/sound";

export default function SoundControl() {
  const enabled = useSoundEnabled();
  return <button className="sound-control" type="button" aria-label={enabled ? "Sesi kapat" : "Sesi aç"} aria-pressed={enabled} onClick={() => {
    const next = !isSoundEnabled();
    setSoundEnabled(next);
    if (next) { unlockAudio(); playSound("click"); }
  }}>{enabled ? "🔊 Ses Açık" : "🔇 Ses Kapalı"}</button>;
}
