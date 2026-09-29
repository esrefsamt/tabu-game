import { useEffect, useState } from "react";
import type { CardResult } from "@tabu/shared";
import { socket } from "../lib/socket";
import { playSound } from "../lib/sound";

interface Toast {
  id: number;
  result: CardResult;
}

const RESULT_TEXT: Record<CardResult["action"], string> = {
  correct: "Doğru bilindi",
  pass: "Pas geçildi",
  tabu: "Tabu"
};
const RESULT_ICON: Record<CardResult["action"], string> = { correct: "✓", pass: "→", tabu: "!" };

export default function CardResultToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let nextId = 0;
    const timers = new Set<number>();
    const onResult = (result: CardResult) => {
      playSound(result.action);
      const id = ++nextId;
      setToasts((current) => [...current, { id, result }]);
      const timer = window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
        timers.delete(timer);
      }, 3500);
      timers.add(timer);
    };

    socket.on("game:card-result", onResult);
    return () => {
      socket.off("game:card-result", onResult);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div className="card-result-toasts" aria-live="polite" aria-atomic="false">
      {toasts.map(({ id, result }) => (
        <p className={`card-result-toast card-result-${result.action}`} key={id}>
          <span className="card-result-icon" aria-hidden="true">{RESULT_ICON[result.action]}</span>
          <span>{RESULT_TEXT[result.action]}: <strong>{result.word}</strong></span>
        </p>
      ))}
    </div>
  );
}
