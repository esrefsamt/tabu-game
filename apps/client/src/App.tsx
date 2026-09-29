import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage";
import CardResultToasts from "./components/CardResultToasts";
import SoundControl from "./components/SoundControl";
import { playSound, unlockAudio } from "./lib/sound";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest("button");
      if (!button || button.classList.contains("sound-control") || button.disabled) return;
      unlockAudio();
      playSound("click");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return (
    <BrowserRouter>
      <SoundControl />
      <CardResultToasts />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomCode" element={<LobbyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
