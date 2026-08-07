"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";

function calc(target: number) {
  const diff = Math.max(0, target - Date.now());
  const dias = Math.floor(diff / 86400000);
  const horas = Math.floor((diff % 86400000) / 3600000);
  const min = Math.floor((diff % 3600000) / 60000);
  const seg = Math.floor((diff % 60000) / 1000);
  return { dias, horas, min, seg, acabou: diff === 0 };
}

const Bloco = ({ valor, label }: { valor: number | null; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="comic-panel px-2 py-3 min-w-[68px] text-center bg-hero-blue-deep">
      <span className="num text-4xl font-bold text-hero-gold">
        {valor === null ? "--" : String(valor).padStart(2, "0")}
      </span>
    </div>
    <span className="mt-1 text-[10px] uppercase tracking-widest text-white/70">
      {label}
    </span>
  </div>
);

export default function Countdown() {
  const target = new Date(EVENT.dataISO).getTime();
  const [t, setT] = useState(() => calc(target));
  // Só mostramos os números depois de montar no cliente, para o HTML do
  // servidor e o do navegador baterem (evita erro de hydration do React).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (t.acabou) {
    return (
      <p className="comic-title text-3xl text-center animate-pulse-glow">
        A MISSÃO COMEÇOU! 💥
      </p>
    );
  }

  return (
    <div className="flex items-start justify-center gap-2">
      <Bloco valor={mounted ? t.dias : null} label="dias" />
      <Bloco valor={mounted ? t.horas : null} label="horas" />
      <Bloco valor={mounted ? t.min : null} label="min" />
      <Bloco valor={mounted ? t.seg : null} label="seg" />
    </div>
  );
}
