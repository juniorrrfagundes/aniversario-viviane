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

const Bloco = ({ valor, label }: { valor: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="comic-panel px-2 py-3 min-w-[68px] text-center bg-hero-blue-deep">
      <span
        className="text-4xl font-bold text-hero-gold tabular-nums"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        {String(valor).padStart(2, "0")}
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

  useEffect(() => {
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
      <Bloco valor={t.dias} label="dias" />
      <Bloco valor={t.horas} label="horas" />
      <Bloco valor={t.min} label="min" />
      <Bloco valor={t.seg} label="seg" />
    </div>
  );
}
