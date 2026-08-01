"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ShieldCheck, PartyPopper } from "lucide-react";
import {
  rsvpSchema,
  type RsvpInput,
  type RsvpOutput,
} from "@/lib/rsvp-schema";

export default function RsvpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RsvpInput, unknown, RsvpOutput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { acompanhante: "nao" },
  });

  const [enviado, setEnviado] = useState(false);
  const [erroServidor, setErroServidor] = useState<string | null>(null);
  const levaAcompanhante = watch("acompanhante") === "sim";

  const onSubmit = async (data: RsvpOutput) => {
    setErroServidor(null);
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block">
        <span className="text-sm font-semibold text-white/80">Nome *</span>
        <input {...register("nome")} className={inputCls} placeholder="Seu nome" />
        {errors.nome && (
          <span className="text-xs text-hero-gold">{errors.nome.message}</span>
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
          <span className="text-xs text-hero-gold">
            {errors.comparecera.message}
          </span>
        )}
      </fieldset>

      <fieldset>
        <span className="text-sm font-semibold text-white/80">
          Levará acompanhante?
        </span>
        <div className="mt-2 flex gap-3">
          <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-black bg-white/90 px-3 py-2 text-black has-[:checked]:bg-hero-gold">
            <input type="radio" value="sim" {...register("acompanhante")} />
            Sim
          </label>
          <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-black bg-white/90 px-3 py-2 text-black has-[:checked]:bg-hero-gold">
            <input type="radio" value="nao" {...register("acompanhante")} />
            Não
          </label>
        </div>
      </fieldset>

      {levaAcompanhante && (
        <label className="block">
          <span className="text-sm font-semibold text-white/80">
            Quantos acompanhantes?
          </span>
          <input
            type="number"
            min={0}
            max={10}
            {...register("qtdAcompanhantes")}
            className={inputCls}
            placeholder="0"
          />
        </label>
      )}

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

      {erroServidor && (
        <p className="rounded-lg bg-hero-red/20 p-2 text-sm text-hero-gold">
          {erroServidor}
        </p>
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
