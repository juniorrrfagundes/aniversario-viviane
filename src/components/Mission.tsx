"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  numero?: string;
  titulo: string;
  emoji?: string;
  children: ReactNode;
  cor?: "azul" | "vermelho" | "dourado" | "rosa";
};

const cores = {
  azul: "text-hero-blue",
  vermelho: "text-hero-red",
  dourado: "text-hero-gold",
  rosa: "text-hero-pink",
};

export default function Mission({
  numero,
  titulo,
  emoji,
  children,
  cor = "dourado",
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="comic-panel halftone px-4 py-5"
    >
      {numero && (
        <span className="inline-block font-comic text-sm text-black bg-hero-gold px-2 py-0.5 rounded-md border-2 border-black mb-2">
          MISSÃO {numero}
        </span>
      )}
      <h2 className={`font-comic text-2xl leading-tight mb-3 ${cores[cor]}`}>
        {emoji && <span className="mr-1">{emoji}</span>}
        {titulo}
      </h2>
      <div className="text-white/90 text-[15px] leading-relaxed">{children}</div>
    </motion.section>
  );
}
