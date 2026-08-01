-- ============================================================
-- Schema do banco — Liga dos Heróis (50 anos da Super Vivi)
-- Cole e rode isto no Supabase: menu "SQL Editor" > New query > Run
-- ============================================================

-- 1) Tabela de confirmações de presença (RSVP)
create table if not exists public.confirmacoes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  nome_heroi text,
  comparecera text not null check (comparecera in ('sim', 'nao')),
  acompanhante text not null default 'nao' check (acompanhante in ('sim', 'nao')),
  qtd_acompanhantes int not null default 0,
  mensagem text,
  criado_em timestamptz not null default now()
);

-- 2) Tabela de metadados das fotos do mural
create table if not exists public.fotos (
  id uuid primary key default gen_random_uuid(),
  nome text,
  arquivo text not null,
  criado_em timestamptz not null default now()
);

-- 3) Segurança (RLS)
-- Habilita Row Level Security e NÃO cria políticas públicas.
-- Resultado: ninguém acessa direto pelo navegador; só o servidor da
-- aplicação (que usa a chave service_role) consegue ler e gravar.
alter table public.confirmacoes enable row level security;
alter table public.fotos enable row level security;

-- 4) Bucket de Storage para as fotos (privado)
insert into storage.buckets (id, name, public)
values ('mural', 'mural', false)
on conflict (id) do nothing;
