"use client";

import { useRef, useState } from "react";
import { Camera, Upload, CheckCircle2, ImagePlus } from "lucide-react";

export default function PhotoUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [nome, setNome] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const escolher = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    setErro(null);
    if (!f) return;
    if (f.size > 8 * 1024 * 1024) {
      setErro("Foto muito grande (máx. 8 MB).");
      return;
    }
    setArquivo(f);
    setPreview(URL.createObjectURL(f));
  };

  const enviar = async () => {
    if (!arquivo) return;
    setEnviando(true);
    setErro(null);
    try {
      const fd = new FormData();
      fd.append("foto", arquivo);
      fd.append("nome", nome);
      const res = await fetch("/api/foto", { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error || "");
      }
      setEnviado(true);
    } catch (e) {
      setErro(
        e instanceof Error && e.message
          ? e.message
          : "Não foi possível enviar. Tente novamente.",
      );
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="speech-bubble p-5 text-center">
        <CheckCircle2 className="mx-auto text-green-600" size={40} />
        <p className="font-comic mt-2 text-2xl text-hero-blue-deep">
          FOTO RECEBIDA!
        </p>
        <p className="mt-1 text-sm text-black/80">
          Sua imagem entrará no mural ao lado da anfitriã. Prepare-se para
          brilhar! ✨
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="mb-1">
        Envie uma foto sua para aparecer no{" "}
        <strong className="text-hero-gold">mural da festa</strong>, ao lado da
        anfitriã! 📸
      </p>

      <label className="block">
        <span className="text-sm font-semibold text-white/80">
          Seu nome (para legenda)
        </span>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Como quer aparecer no mural"
          className="mt-1 w-full rounded-lg border-2 border-black bg-white px-3 py-2 text-black outline-none focus:border-hero-gold"
        />
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={escolher}
        className="hidden"
      />

      {preview ? (
        <div className="overflow-hidden rounded-xl border-4 border-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Pré-visualização" className="w-full" />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="btn-comic flex w-full items-center justify-center gap-2 bg-hero-pink px-4 py-6 text-white"
        >
          <ImagePlus size={22} /> ESCOLHER FOTO
        </button>
      )}

      {preview && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 text-sm text-white/70 underline"
        >
          <Camera size={16} /> Trocar foto
        </button>
      )}

      {erro && <p className="text-sm text-hero-gold">{erro}</p>}

      <button
        type="button"
        onClick={enviar}
        disabled={!arquivo || enviando}
        className="btn-comic flex w-full items-center justify-center gap-2 bg-hero-blue px-4 py-3 text-lg text-white disabled:opacity-40"
      >
        <Upload size={20} />
        {enviando ? "ENVIANDO..." : "ENVIAR PARA O MURAL"}
      </button>
    </div>
  );
}
