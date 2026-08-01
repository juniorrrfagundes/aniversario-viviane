"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, CalendarDays } from "lucide-react";
import { EVENT, CATEGORIAS_TORNEIO, REGRAS_UNIFORME } from "@/lib/event";
import Countdown from "@/components/Countdown";
import Mission from "@/components/Mission";
import ComicBackground from "@/components/ComicBackground";
import MusicToggle from "@/components/MusicToggle";
import RsvpForm from "@/components/RsvpForm";
import PhotoUpload from "@/components/PhotoUpload";

export default function Home() {
  return (
    <>
      <ComicBackground />
      <MusicToggle />

      {/* Container mobile-first: coluna única, largura de celular */}
      <main className="relative z-10 mx-auto w-full max-w-[480px] px-4 pb-16">
        {/* ---------- TOPO / ALERTA ---------- */}
        <motion.header
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="pt-10 text-center"
        >
          <span className="inline-block rounded-md border-2 border-black bg-hero-red px-3 py-1 font-comic text-sm text-white animate-pulse-glow">
            🚨 ALERTA MÁXIMO
          </span>
          <h1 className="comic-title mt-4 text-4xl">
            CONVOCAÇÃO OFICIAL DA LIGA DOS HERÓIS
          </h1>
          <p className="mt-3 text-sm text-white/80">
            Os maiores heróis, vilões e personagens do universo geek foram
            convocados para uma celebração épica.
          </p>

          <div className="comic-panel mt-6 px-4 py-5">
            <p className="text-sm text-white/70">🎉 CELEBRAÇÃO ESPECIAL</p>
            <p className="comic-title text-3xl mt-1">
              {EVENT.idade} ANOS DA SUPER VIVI
            </p>
            <p className="mt-4 text-sm text-white/80">
              A anfitriã já confirmou presença e comparecerá como:
            </p>
            <p className="comic-title mt-2 text-4xl text-hero-pink animate-pulse-glow">
              SUPERGIRL
            </p>
            <p className="mt-2 text-xs text-white/60">
              💙❤️ figurino exclusivo da anfitriã ❤️💙
            </p>
          </div>

          <div className="mt-6">
            <p className="mb-3 font-comic text-lg text-hero-gold">
              ⏳ CONTAGEM REGRESSIVA
            </p>
            <Countdown />
          </div>
        </motion.header>

        <div className="mt-10 space-y-6">
          {/* ---------- MISSÃO 01 — FOTO NO MURAL ---------- */}
          <Mission
            numero="01"
            titulo="Sua Foto no Mural"
            emoji="📸"
            cor="rosa"
          >
            <PhotoUpload />
          </Mission>

          {/* ---------- MISSÃO 02 — INFORMAÇÕES ---------- */}
          <Mission
            numero="02"
            titulo="Informações Secretas"
            emoji="📜"
            cor="azul"
          >
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 shrink-0 text-hero-gold" size={20} />
                <span>
                  <strong>Data:</strong> {EVENT.dataTexto}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 shrink-0 text-hero-gold" size={20} />
                <span>
                  <strong>Horário:</strong> {EVENT.horario}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-hero-gold" size={20} />
                <span>
                  <strong>Base de Operações:</strong> {EVENT.local.nome}
                  <br />
                  <span className="text-white/70">{EVENT.local.endereco}</span>
                </span>
              </li>
            </ul>
            <a
              href={EVENT.local.mapa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-comic mt-4 flex w-full items-center justify-center gap-2 bg-hero-blue px-4 py-2 text-white"
            >
              <MapPin size={18} /> VER NO MAPA
            </a>
          </Mission>

          {/* ---------- MISSÃO 03 — UNIFORME ---------- */}
          <Mission
            numero="03"
            titulo="Uniforme Obrigatório"
            emoji="🎭"
            cor="rosa"
          >
            <p className="mb-3">
              Todos os agentes deverão comparecer caracterizados! São aceitos
              heróis 🦸, vilões 🦹, personagens geek 🎮 e de filmes, séries, HQs
              e games 🧙.
            </p>
            <p className="mb-2 font-semibold text-hero-gold">Regras da Liga:</p>
            <ul className="space-y-1">
              {REGRAS_UNIFORME.map((r) => (
                <li key={r}>✔ {r}</li>
              ))}
            </ul>

            <div className="mt-4 rounded-lg border-2 border-hero-pink/70 bg-hero-pink/10 p-3">
              <p className="text-sm">
                💙 <strong>Atenção, herói(na):</strong> a fantasia da{" "}
                <strong>Supergirl é exclusiva da anfitriã</strong>. Escolha
                outro personagem ou traje e brilhe com a sua própria
                identidade!
              </p>
            </div>
          </Mission>

          {/* ---------- MISSÃO 04 — TORNEIO ---------- */}
          <Mission
            numero="04"
            titulo="Torneio dos Campeões"
            emoji="🏆"
            cor="dourado"
          >
            <p className="mb-3">
              A melhor caracterização será premiada! Categorias:
            </p>
            <ul className="space-y-2">
              {CATEGORIAS_TORNEIO.map((c) => (
                <li
                  key={c.titulo}
                  className="rounded-lg border-2 border-black bg-black/20 px-3 py-2"
                >
                  {c.emoji} {c.titulo}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-white/70">
              A votação e a premiação acontecem durante a festa. Capriche no
              traje! ✨
            </p>
          </Mission>

          {/* ---------- RSVP ---------- */}
          <Mission titulo="Confirmação de Presença" emoji="✅" cor="vermelho">
            <p className="mb-4">
              Para ingressar na Liga dos Heróis, preencha seus dados abaixo:
            </p>
            <RsvpForm />
          </Mission>

          {/* ---------- MENSAGEM DA VIVI ---------- */}
          <MensagemEspecial
            imagem="/imagem/viviane.jpeg"
            imagemAlt="Viviane, a aniversariante"
            titulo="💙 Uma Mensagem Especial da Super Vivi 💙"
            paragrafos={[
              "Ao longo dos meus 50 anos, Deus colocou muitas pessoas em meu caminho. Cada uma deixou sua marca, ensinou algo e fez parte da minha história.",
              "Hoje, ao celebrar este momento tão especial, quero estar cercada por pessoas que continuam presentes na minha caminhada, compartilhando alegrias, desafios, conquistas e momentos inesquecíveis.",
              "Você não foi convidado apenas para uma festa; foi convidado porque faz parte da minha história e ocupa um lugar especial no meu coração.",
              "Que esta celebração seja um momento de alegria, gratidão, amizade e união. Muito obrigada por fazer parte da minha história.",
            ]}
            assinatura="Com carinho, Viviane – Sua Super Vivi da noite 💙❤️"
          />

          {/* ---------- HOMENAGEM AO PAI ---------- */}
          <MensagemEspecial
            imagem="/imagem/viviane-e-pai.jpg"
            imagemAlt="Viviane e seu pai"
            titulo="💙 Ao Meu Maior Herói 💙"
            paragrafos={[
              "Neste momento tão especial, meu coração se volta para alguém que, mesmo não estando fisicamente entre nós, continua presente todos os dias da minha vida.",
              "Pai, o tempo não diminuiu a saudade, nem apagou os ensinamentos, o amor e a força que você deixou em mim. Você foi meu primeiro exemplo de coragem, caráter, dedicação e amor.",
              "Nesta festa de super-heróis, muitos personagens estarão presentes, mas nenhum será maior do que você foi para mim. Seu maior poder sempre foi o amor incondicional que dedicou à nossa família.",
              "Esta celebração também é uma homenagem a você, meu maior herói, meu eterno exemplo e meu pai amado.",
            ]}
            assinatura="Com todo o meu amor e eterna gratidão, sua filha, Viviane ❤️"
          />

          {/* ---------- RODAPÉ ÉPICO ---------- */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="comic-panel mt-2 px-4 py-6 text-center"
          >
            <p className="comic-title text-2xl">💥 NOS VEMOS EM 17/10/2026 💥</p>
            <p className="mt-2 font-comic text-lg text-hero-gold">
              🌟 FESTA DOS 50 ANOS DA SUPER VIVI 🌟
            </p>
            <p className="mt-3 text-sm text-white/70">
              Prepare seu uniforme. Recarregue seus poderes. A Super Vivi conta
              com você!
            </p>
          </motion.footer>
        </div>
      </main>
    </>
  );
}

function MensagemEspecial({
  titulo,
  paragrafos,
  assinatura,
  imagem,
  imagemAlt,
}: {
  titulo: string;
  paragrafos: string[];
  assinatura: string;
  imagem?: string;
  imagemAlt?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="speech-bubble p-5"
    >
      {imagem && (
        <div className="mb-4 overflow-hidden rounded-xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.4)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagem}
            alt={imagemAlt || ""}
            className="block w-full object-cover"
          />
        </div>
      )}
      <h3 className="font-comic text-xl text-hero-blue-deep">{titulo}</h3>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-black/85">
        {paragrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <p className="mt-4 text-sm font-semibold text-hero-red">{assinatura}</p>
    </motion.section>
  );
}
