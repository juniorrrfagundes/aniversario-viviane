"use client";

import { useState } from "react";
import { Lock, Download, Users, Check, X } from "lucide-react";

type Registro = {
  id: string;
  nome: string;
  nomeHeroi?: string;
  comparecera: "sim" | "nao";
  acompanhante: "sim" | "nao";
  qtdAcompanhantes?: number;
  mensagem?: string;
  criadoEm: string;
};

type Resposta = {
  resumo: {
    totalRegistros: number;
    confirmados: number;
    naoVao: number;
    totalPessoasNaFesta: number;
  };
  registros: Registro[];
};

export default function ListaPresenca() {
  const [senha, setSenha] = useState("");
  const [dados, setDados] = useState<Resposta | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      const res = await fetch(
        `/api/lista-presenca?senha=${encodeURIComponent(senha)}`,
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

  const exportarCSV = () => {
    if (!dados) return;
    const cabecalho = [
      "Nome",
      "Nome de Heroi",
      "Comparecera",
      "Acompanhante",
      "Qtd Acompanhantes",
      "Mensagem",
      "Data",
    ];
    const linhas = dados.registros.map((r) =>
      [
        r.nome,
        r.nomeHeroi || "",
        r.comparecera === "sim" ? "Sim" : "Nao",
        r.acompanhante === "sim" ? "Sim" : "Nao",
        r.qtdAcompanhantes ?? 0,
        (r.mensagem || "").replace(/[\n;]/g, " "),
        new Date(r.criadoEm).toLocaleString("pt-BR"),
      ]
        .map((c) => `"${String(c).replace(/"/g, '""')}"`)
        .join(";"),
    );
    // BOM para acentos abrirem certo no Excel
    const csv = "﻿" + [cabecalho.join(";"), ...linhas].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "lista-presenca-vivi-50.csv";
    link.click();
  };

  // ---------- Tela de login ----------
  if (!dados) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-4">
        <form onSubmit={entrar} className="comic-panel w-full space-y-4 p-6">
          <div className="flex items-center gap-2">
            <Lock className="text-hero-gold" />
            <h1 className="font-comic text-2xl text-hero-gold">
              Lista de Presença
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

  // ---------- Painel ----------
  const { resumo, registros } = dados;
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="comic-title text-3xl">Lista de Presença</h1>
      <p className="mt-1 text-sm text-white/60">50 Anos da Super Vivi</p>

      {/* Resumo */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card icon={<Users size={18} />} label="Pessoas na festa" valor={resumo.totalPessoasNaFesta} cor="text-hero-gold" />
        <Card icon={<Check size={18} />} label="Confirmaram" valor={resumo.confirmados} cor="text-green-400" />
        <Card icon={<X size={18} />} label="Não vão" valor={resumo.naoVao} cor="text-hero-red" />
        <Card icon={<Users size={18} />} label="Total respostas" valor={resumo.totalRegistros} cor="text-white" />
      </div>

      <button
        onClick={exportarCSV}
        className="btn-comic mt-5 flex items-center gap-2 bg-hero-blue px-4 py-2 text-white"
      >
        <Download size={18} /> Baixar CSV (Excel)
      </button>

      {/* Tabela */}
      <div className="mt-5 overflow-x-auto rounded-lg border-2 border-black">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-hero-blue-deep font-semibold">
            <tr>
              <th className="px-3 py-2">Nome</th>
              <th className="px-3 py-2">Herói</th>
              <th className="px-3 py-2">Vai?</th>
              <th className="px-3 py-2">Acomp.</th>
              <th className="px-3 py-2">Msg</th>
              <th className="px-3 py-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {registros.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-white/50">
                  Nenhuma confirmação ainda.
                </td>
              </tr>
            )}
            {registros.map((r) => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="px-3 py-2">{r.nome}</td>
                <td className="px-3 py-2">{r.nomeHeroi || "—"}</td>
                <td className="px-3 py-2">
                  {r.comparecera === "sim" ? "✅" : "❌"}
                </td>
                <td className="px-3 py-2">
                  {r.acompanhante === "sim" ? `+${r.qtdAcompanhantes ?? 0}` : "—"}
                </td>
                <td className="max-w-[160px] truncate px-3 py-2" title={r.mensagem}>
                  {r.mensagem || "—"}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-white/60">
                  {new Date(r.criadoEm).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Card({
  icon,
  label,
  valor,
  cor,
}: {
  icon: React.ReactNode;
  label: string;
  valor: number;
  cor: string;
}) {
  return (
    <div className="comic-panel px-3 py-3">
      <div className="flex items-center gap-1 text-white/60">{icon}</div>
      <p className={`font-comic text-3xl ${cor}`}>{valor}</p>
      <p className="text-xs text-white/60">{label}</p>
    </div>
  );
}
