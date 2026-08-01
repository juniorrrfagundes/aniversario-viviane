import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { rsvpSchema } from "@/lib/rsvp-schema";

/**
 * Confirmações de presença (RSVP), persistidas no Supabase (tabela
 * public.confirmacoes). Veja o schema em supabase/schema.sql.
 */

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("confirmacoes")
      .select("nome, nome_heroi")
      .eq("comparecera", "sim")
      .order("criado_em", { ascending: true });

    if (error) throw error;

    const herois = (data ?? []).map((r) => ({
      nomeHeroi: r.nome_heroi || r.nome,
    }));
    return NextResponse.json({ total: herois.length, herois });
  } catch (e) {
    console.error("GET /api/rsvp falhou:", e);
    return NextResponse.json(
      { error: "Não foi possível carregar." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos", detalhes: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const d = parsed.data;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("confirmacoes")
      .insert({
        nome: d.nome,
        nome_heroi: d.nomeHeroi || null,
        comparecera: d.comparecera,
        acompanhante: d.acompanhante,
        qtd_acompanhantes:
          d.acompanhante === "sim" ? d.qtdAcompanhantes ?? 0 : 0,
        mensagem: d.mensagem || null,
      })
      .select("id")
      .single();

    if (error) throw error;
    return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
  } catch (e) {
    console.error("POST /api/rsvp falhou:", e);
    return NextResponse.json(
      { error: "Não foi possível salvar. Tente novamente." },
      { status: 500 },
    );
  }
}
