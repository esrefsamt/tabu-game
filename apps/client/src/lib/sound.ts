import { useSyncExternalStore } from "react";

export type SoundCue = "click" | "round" | "correct" | "pass" | "tabu" | "win";
export const SOUND_STORAGE_KEY = "tabu:sound-enabled";

let enabled = true;
let context: AudioContext | null = null;
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  try { enabled = window.localStorage.getItem(SOUND_STORAGE_KEY) !== "false"; } catch { /* Storage may be disabled. */ }
}

export function setSoundEnabled(value: boolean): void {
  enabled = value;
  try { if (typeof window !== "undefined") window.localStorage.setItem(SOUND_STORAGE_KEY, String(value)); } catch { /* Local preference remains in memory. */ }
  listeners.forEach((listener) => listener());
}

export function isSoundEnabled(): boolean { return enabled; }

export function useSoundEnabled(): boolean {
  return useSyncExternalStore((listener) => {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, isSoundEnabled, () => true);
}

export function unlockAudio(): void {
  if (!enabled || typeof window === "undefined") return;
  try {
    context ??= new AudioContext();
    if (context.state === "suspended") void context.resume().catch(() => {});
  } catch { /* Unsupported or blocked audio must never interrupt play. */ }
}

const NOTES: Record<SoundCue, readonly [number, number, number][]> = {
  click: [[440, 0, 0.035]],
  round: [[523, 0, 0.08], [659, 0.08, 0.1]],
  correct: [[587, 0, 0.075], [784, 0.07, 0.11]],
  pass: [[392, 0, 0.07]],
  tabu: [[330, 0, 0.08], [262, 0.08, 0.1]],
  win: [[523, 0, 0.09], [659, 0.09, 0.09], [784, 0.18, 0.14]]
};

export function playSound(cue: SoundCue): void {
  if (!enabled || !context || context.state !== "running") return;
  try {
    const now = context.currentTime;
    for (const [frequency, delay, duration] of NOTES[cue]) {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, now + delay);
      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.exponentialRampToValueAtTime(cue === "click" ? 0.018 : 0.035, now + delay + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
      oscillator.start(now + delay);
      oscillator.stop(now + delay + duration + 0.01);
    }
  } catch { /* Audio is optional. */ }
}
