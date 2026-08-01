"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Botão flutuante de música de fundo.
 * Coloque um arquivo em /public/music/theme.mp3 para tocar.
 * Se o arquivo não existir, o botão apenas não toca (sem quebrar a página).
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [tocando, setTocando] = useState(false);
  const [temAudio, setTemAudio] = useState(true);

  useEffect(() => {
    const audio = new Audio("/music/theme.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.addEventListener("error", () => setTemAudio(false));
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (tocando) {
      audio.pause();
      setTocando(false);
    } else {
      try {
        await audio.play();
        setTocando(true);
      } catch {
        setTemAudio(false);
      }
    }
  };

  if (!temAudio) return null;

  return (
    <button
      onClick={toggle}
      aria-label={tocando ? "Desligar música" : "Ligar música"}
      className="btn-comic fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-hero-red text-white"
    >
      {tocando ? <Volume2 size={26} /> : <VolumeX size={26} />}
    </button>
  );
}
