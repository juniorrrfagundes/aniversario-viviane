"use client";

import { useState } from "react";
import { Lock, Download, ImageIcon } from "lucide-react";

type Foto = {
  id: string;
  nome: string;
  url: string | null;
  criadoEm: string;
};

type Resposta = { total: number; fotos: Foto[] };

export default function GaleriaFotos() {
  const [senha, setSenha] = useState("");
  const [dados, setDados] = useState<Resposta | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [baixando, setBaixando] = useState<string | null>(null);

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      const res = await fetch(
        `/api/fotos?senha=${encodeURIComponent(senha)}`,
      );
      if (res.status === 401) {
        setErro("Senha incorreta.");
        return;
      }
      if (!res.ok) throw new Error();
      setDados(await res.json());
    } catch {
      setErro("Erro ao carregar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  // Força o download (o bucket é de outra origem, então buscamos o blob)
  const baixar = async (foto: Foto) => {
    if (!foto.url) return;
    setBaixando(foto.id);
    try {
      const resp = await fetch(foto.url);
      const blob = await resp.blob();
      const ext = (blob.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `mural-${foto.nome.replace(/[^\p{L}\p{N}]+/gu, "-")}.${ext}`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch {
      // silencioso
    } finally {
      setBaixando(null);
    }
  };

  // ---------- Tela de login ----------
  if (!dados) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-4">
        <form onSubmit={entrar} className="comic-panel w-full space-y-4 p-6">
          <div className="flex items-center gap-2">
            <Lock className="text-hero-gold" />
            <h1 className="font-comic text-2xl text-hero-gold">
              Galeria do Mural
            </h1>
          </div>
          <p className="text-sm text-white/70">
            Área restrita da organização. Digite a senha de acesso.
          </p>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="w-full rounded-lg border-2 border-black bg-white px-3 py-2 text-black outline-none focus:border-hero-gold"
          />
          {erro && <p className="text-sm text-hero-gold">{erro}</p>}
          <button
            type="submit"
            disabled={carregando}
            className="btn-comic w-full bg-hero-red px-4 py-2 text-white disabled:opacity-50"
          >
            {carregando ? "Verificando..." : "ENTRAR"}
          </button>
        </form>
      </main>
    );
  }

  // ---------- Galeria ----------
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="comic-title text-3xl">Galeria do Mural</h1>
      <p className="mt-1 text-sm text-white/60">
        <span className="num">{dados.total}</span>{" "}
        {dados.total === 1 ? "foto enviada" : "fotos enviadas"} pelos convidados
      </p>
      <a
        href="/lista"
        className="mt-2 inline-flex items-center gap-1 text-sm text-hero-gold underline"
      >
        📋 Ver lista de presença
      </a>

      {dados.total === 0 ? (
        <div className="comic-panel mt-6 flex flex-col items-center gap-2 px-4 py-10 text-center text-white/60">
          <ImageIcon size={40} />
          <p>Nenhuma foto enviada ainda.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {dados.fotos.map((foto) => (
            <div
              key={foto.id}
              className="comic-panel overflow-hidden p-0"
            >
              {foto.url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={foto.url}
                  alt={foto.nome}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-black/30 text-white/40">
                  <ImageIcon size={32} />
                </div>
              )}
              <div className="p-2">
                <p className="truncate text-sm font-semibold" title={foto.nome}>
                  {foto.nome}
                </p>
                <p className="num text-[11px] text-white/50">
                  {new Date(foto.criadoEm).toLocaleDateString("pt-BR")}
                </p>
                <button
                  onClick={() => baixar(foto)}
                  disabled={!foto.url || baixando === foto.id}
                  className="btn-comic mt-2 flex w-full items-center justify-center gap-1 bg-hero-blue px-2 py-1 text-xs text-white disabled:opacity-50"
                >
                  <Download size={14} />
                  {baixando === foto.id ? "..." : "Baixar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
