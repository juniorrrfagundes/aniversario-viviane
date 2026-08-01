import { NextRequest, NextResponse } from "next/server";
import { getSupabase, BUCKET_MURAL } from "@/lib/supabase";

/**
 * Recebe a foto do convidado para o mural ao lado da anfitriã.
 * Sobe o arquivo para o Supabase Storage (bucket "mural") e registra os
 * metadados na tabela public.fotos. Veja supabase/schema.sql.
 */

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const TIPOS_OK = ["image/jpeg", "image/png", "image/webp", "image/heic"];

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Envio inválido" }, { status: 400 });
  }

  const arquivo = form.get("foto");
  const nome = (form.get("nome") as string | null)?.trim() || "Convidado";

  if (!(arquivo instanceof File)) {
    return NextResponse.json({ error: "Nenhuma foto enviada" }, { status: 422 });
  }
  if (!TIPOS_OK.includes(arquivo.type)) {
    return NextResponse.json(
      { error: "Formato não suportado. Use JPG, PNG ou WEBP." },
      { status: 415 },
    );
  }
  if (arquivo.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Foto muito grande (máx. 8 MB)." },
      { status: 413 },
    );
  }

  try {
    const supabase = getSupabase();
    const ext = (arquivo.name.split(".").pop() || "jpg").toLowerCase();
    const id = crypto.randomUUID();
    const caminho = `${id}.${ext}`;
    const buffer = Buffer.from(await arquivo.arrayBuffer());

    const { error: upErro } = await supabase.storage
      .from(BUCKET_MURAL)
      .upload(caminho, buffer, {
        contentType: arquivo.type,
        upsert: false,
      });
    if (upErro) throw upErro;

    const { error: dbErro } = await supabase.from("fotos").insert({
      id,
      nome,
      arquivo: caminho,
    });
    if (dbErro) throw dbErro;

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("POST /api/foto falhou:", e);
    return NextResponse.json(
      { error: "Não foi possível salvar a foto. Tente novamente." },
      { status: 500 },
    );
  }
}
