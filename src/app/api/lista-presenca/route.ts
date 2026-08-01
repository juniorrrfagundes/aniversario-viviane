import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/**
 * Lista de presença COMPLETA — uso administrativo (só a organização).
 * Protegida por senha simples via variável de ambiente ADMIN_SENHA.
 *
 * Uso: GET /api/lista-presenca?senha=SUA_SENHA
 */

const SENHA = process.env.ADMIN_SENHA || "vivi50";

type LinhaDb = {
  id: string;
  nome: string;
  nome_heroi: string | null;
  comparecera: "sim" | "nao";
  mensagem: string | null;
  criado_em: string;
};

export async function GET(req: NextRequest) {
  const senha = req.nextUrl.searchParams.get("senha");
  if (senha !== SENHA) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("confirmacoes")
      .select("*")
      .order("criado_em", { ascending: false });

    if (error) throw error;

    const linhas = (data ?? []) as LinhaDb[];

    // Converte para o formato que o painel espera (camelCase)
    const registros = linhas.map((r) => ({
      id: r.id,
      nome: r.nome,
      nomeHeroi: r.nome_heroi || "",
      comparecera: r.comparecera,
      mensagem: r.mensagem || "",
      criadoEm: r.criado_em,
    }));

    const confirmados = registros.filter((r) => r.comparecera === "sim");

    return NextResponse.json({
      resumo: {
        totalRegistros: registros.length,
        confirmados: confirmados.length,
        naoVao: registros.filter((r) => r.comparecera === "nao").length,
      },
      registros,
    });
  } catch (e) {
    console.error("GET /api/lista-presenca falhou:", e);
    return NextResponse.json(
      { error: "Não foi possível carregar a lista." },
      { status: 500 },
    );
  }
}
