import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase para uso NO SERVIDOR (rotas de API).
 *
 * Usa a chave "service_role", que tem acesso total e SÓ pode ficar no servidor
 * — nunca exponha no navegador. Por isso a variável NÃO tem prefixo
 * NEXT_PUBLIC_ (esse prefixo tornaria a chave visível no cliente).
 *
 * O cliente é criado sob demanda (lazy) para o build não quebrar caso as
 * variáveis de ambiente ainda não estejam definidas.
 */

let cache: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cache) return cache;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY (veja .env.example).",
    );
  }

  cache = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cache;
}

// Nome do bucket de Storage onde as fotos do mural ficam.
export const BUCKET_MURAL = "mural";
