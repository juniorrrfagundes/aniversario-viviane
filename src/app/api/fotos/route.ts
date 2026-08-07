import { NextRequest, NextResponse } from "next/server";
import { getSupabase, BUCKET_MURAL } from "@/lib/supabase";

/**
 * Galeria administrativa das fotos do mural.
 * Protegida por senha (ADMIN_SENHA), como a lista de presença.
 *
 * Como o bucket é privado, geramos URLs assinadas (temporárias) para
 * conseguir exibir/baixar cada imagem no navegador.
 *
 * Uso: GET /api/fotos?senha=SUA_SENHA
 */

const SENHA = process.env.ADMIN_SENHA || "vivi50";
const VALIDADE_SEGUNDOS = 60 * 60; // 1 hora

type LinhaFoto = {
  id: string;
  nome: string | null;
  arquivo: string;
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
      .from("fotos")
      .select("*")
      .order("criado_em", { ascending: false });
    if (error) throw error;

    const linhas = (data ?? []) as LinhaFoto[];
    if (linhas.length === 0) {
      return NextResponse.json({ total: 0, fotos: [] });
    }

    // Gera URLs assinadas em lote
    const caminhos = linhas.map((l) => l.arquivo);
    const { data: assinadas, error: errAssin } = await supabase.storage
      .from(BUCKET_MURAL)
      .createSignedUrls(caminhos, VALIDADE_SEGUNDOS);
    if (errAssin) throw errAssin;

    const mapaUrl = new Map(
      (assinadas ?? []).map((a) => [a.path, a.signedUrl]),
    );

    const fotos = linhas.map((l) => ({
      id: l.id,
      nome: l.nome || "Convidado",
      url: mapaUrl.get(l.arquivo) || null,
      criadoEm: l.criado_em,
    }));

    return NextResponse.json({ total: fotos.length, fotos });
  } catch (e) {
    console.error("GET /api/fotos falhou:", e);
    return NextResponse.json(
      { error: "Não foi possível carregar as fotos." },
      { status: 500 },
    );
  }
}
