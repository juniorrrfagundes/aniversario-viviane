"use client";

import { motion } from "framer-motion";

// Posições fixas (evita mismatch de hidratação do SSR)
const FLUTUANTES = [
  { emoji: "⚡", left: "8%", top: "12%", size: 26, delay: 0 },
  { emoji: "💥", left: "82%", top: "18%", size: 30, delay: 0.6 },
  { emoji: "⭐", left: "15%", top: "45%", size: 20, delay: 1.2 },
  { emoji: "🛡️", left: "78%", top: "55%", size: 24, delay: 0.3 },
  { emoji: "✨", left: "50%", top: "8%", size: 18, delay: 0.9 },
  { emoji: "⚡", left: "90%", top: "78%", size: 22, delay: 1.5 },
  { emoji: "⭐", left: "6%", top: "80%", size: 22, delay: 0.4 },
  { emoji: "💫", left: "45%", top: "70%", size: 20, delay: 1.1 },
];

export default function ComicBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {FLUTUANTES.map((f, i) => (
        <motion.span
          key={i}
          className="absolute select-none opacity-40"
          style={{ left: f.left, top: f.top, fontSize: f.size }}
          animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0] }}
          transition={{
            duration: 5 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: f.delay,
          }}
        >
          {f.emoji}
        </motion.span>
      ))}
    </div>
  );
}
