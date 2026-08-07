"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ShieldCheck, PartyPopper, AlertTriangle } from "lucide-react";
import {
  rsvpSchema,
  type RsvpInput,
  type RsvpOutput,
} from "@/lib/rsvp-schema";

export default function RsvpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RsvpInput, unknown, RsvpOutput>({
    resolver: zodResolver(rsvpSchema),
  });

  const [enviado, setEnviado] = useState(false);
  const [erroServidor, setErroServidor] = useState<string | null>(null);
  const [avisoValidacao, setAvisoValidacao] = useState(false);

  const onSubmit = async (data: RsvpOutput) => {
    setErroServidor(null);
    setAvisoValidacao(false);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setEnviado(true);
    } catch {
      setErroServidor("Ops! Não conseguimos registrar. Tente novamente.");
    }
  };

  // Chamado quando o usuário clica em enviar mas há campos inválidos
  const onInvalid = () => setAvisoValidacao(true);

  if (enviado) {
    return (
      <div className="speech-bubble p-5 text-center">
        <PartyPopper className="mx-auto text-hero-red" size={40} />
        <p className="font-comic mt-2 text-2xl text-hero-red">
          MISSÃO ACEITA!
        </p>
        <p className="mt-1 text-sm text-black/80">
          Sua presença foi registrada pelos guardiões do universo. Prepare seu
          uniforme e recarregue seus poderes! 💥
        </p>
      </div>
    );
  }

  const inputCls =
    "mt-1 w-full rounded-lg border-2 border-black bg-white px-3 py-2 text-black outline-none focus:border-hero-gold";

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
      <label className="block">
        <span className="text-sm font-semibold text-white/80">Nome *</span>
        <input {...register("nome")} className={inputCls} placeholder="Seu nome" />
        {errors.nome && (
          <span className="mt-1 flex items-center gap-1 text-sm font-semibold text-hero-gold">
            <AlertTriangle size={14} /> {errors.nome.message}
          </span>
        )}
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-white/80">
          Nome de Herói
        </span>
        <input
          {...register("nomeHeroi")}
          className={inputCls}
          placeholder="Como quer ser chamado na festa?"
        />
      </label>

      <fieldset>
        <span className="text-sm font-semibold text-white/80">
          Comparecerá à missão? *
        </span>
        <div className="mt-2 flex gap-3">
          <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-black bg-white/90 px-3 py-2 text-black has-[:checked]:bg-hero-gold">
            <input type="radio" value="sim" {...register("comparecera")} />
            Sim! 🦸
          </label>
          <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-black bg-white/90 px-3 py-2 text-black has-[:checked]:bg-hero-red has-[:checked]:text-white">
            <input type="radio" value="nao" {...register("comparecera")} />
            Não poderei
          </label>
        </div>
        {errors.comparecera && (
          <span className="mt-2 flex items-center gap-1 text-sm font-semibold text-hero-gold">
            <AlertTriangle size={14} /> {errors.comparecera.message}
          </span>
        )}
      </fieldset>

      <label className="block">
        <span className="text-sm font-semibold text-white/80">
          Mensagem para a Super Vivi (opcional)
        </span>
        <textarea
          {...register("mensagem")}
          rows={3}
          className={inputCls}
          placeholder="Deixe um recado carinhoso 💙"
        />
      </label>

      {avisoValidacao && (
        <div className="flex items-start gap-2 rounded-lg border-2 border-hero-gold bg-hero-gold/15 p-3 text-sm font-semibold text-hero-gold">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <span>
            Ops! Preencha os campos obrigatórios (*): seu nome e se você vai
            comparecer.
          </span>
        </div>
      )}

      {erroServidor && (
        <div className="flex items-start gap-2 rounded-lg border-2 border-hero-red bg-hero-red/20 p-3 text-sm font-semibold text-white">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <span>{erroServidor}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-comic flex w-full items-center justify-center gap-2 bg-hero-red px-4 py-3 text-lg text-white disabled:opacity-50"
      >
        <ShieldCheck size={22} />
        {isSubmitting ? "REGISTRANDO..." : "ENTRAR PARA A LIGA"}
      </button>
    </form>
  );
}
