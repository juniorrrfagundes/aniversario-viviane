# 🦸 Liga dos Heróis — 50 Anos da Super Vivi

Convite web interativo (mobile-first) para a festa de 50 anos da Viviane, com tema de super-heróis. Feito em **Next.js 16 + React 19 + Tailwind CSS v4 + Framer Motion**.

> 📱 **Otimizado para celular** — o layout foi desenhado para telas de smartphone (coluna única, largura máx. ~480px, botões grandes para toque).

## ✨ Funcionalidades

- 🎬 Abertura épica com "Alerta Máximo" e contagem regressiva ao vivo
- 🎯 **Gerador de cartão de herói** — o convidado digita o nome, gera um cartão personalizado (com poder e nível) e **baixa como imagem**
- 📜 Informações do evento (data, horário, local com link para o mapa)
- 🎭 Regras de uniforme, torneio de fantasias e desafios da noite
- 📸 **QR Code** para compartilhar o convite / enviar fotos
- ✅ **Confirmação de presença (RSVP)** com validação e mensagem para a aniversariante
- 💙 Mensagens especiais da Vivi e a homenagem ao pai
- 🎵 Botão de música de fundo (opcional) + animações estilo HQ

## 🚀 Como rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` (ou a porta indicada no terminal).
Para simular o celular: abra o DevTools do navegador (F12) e ative o modo dispositivo móvel.

## 🎵 Música de fundo (opcional)

Coloque um arquivo em `public/music/theme.mp3`. Se não houver arquivo, o botão de música simplesmente não aparece — nada quebra.

## 📝 Como editar os textos e dados

Quase tudo fica em **`src/lib/event.ts`**: data, horário, local, categorias do torneio, desafios e heróis confirmados. As mensagens especiais estão em `src/app/page.tsx`.

## ☁️ Publicar na nuvem (deploy)

O caminho mais simples é a **Vercel** (criadora do Next.js):

1. Suba o projeto para um repositório no GitHub.
2. Em [vercel.com](https://vercel.com), clique em *Add New → Project* e importe o repositório.
3. A Vercel detecta o Next.js automaticamente. Clique em *Deploy*.

### ⚠️ Importante antes de publicar: persistência do RSVP

Hoje as confirmações são gravadas em `data/rsvps.json` (arquivo local) — isso funciona **só em desenvolvimento**. Em serverless (Vercel) o sistema de arquivos é efêmero, então **os dados se perderiam**.

Antes de publicar de verdade, troque o armazenamento por um banco na nuvem. O recomendado é o **Supabase** (PostgreSQL grátis):

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Crie a tabela `confirmacoes` (ver schema no `ROADMAP.md`, Fase 3).
3. Instale o cliente: `npm install @supabase/supabase-js`.
4. Substitua a leitura/gravação em `src/app/api/rsvp/route.ts` pelas chamadas ao Supabase (há comentários no arquivo indicando onde).
5. Configure as variáveis de ambiente na Vercel (`NEXT_PUBLIC_SUPABASE_URL`, etc.).

## 📂 Estrutura

```
src/
├── app/
│   ├── layout.tsx          # Fontes, metadados, tema mobile
│   ├── page.tsx            # Página principal (todas as seções)
│   ├── globals.css         # Design system (cores/fontes de HQ)
│   └── api/rsvp/route.ts   # API de confirmação (POST/GET)
├── components/
│   ├── Countdown.tsx       # Contagem regressiva
│   ├── Mission.tsx         # Painel "missão" (moldura de HQ)
│   ├── HeroCardGenerator.tsx  # Gerador de cartão de herói
│   ├── RsvpForm.tsx        # Formulário de presença
│   ├── ShareQR.tsx         # QR Code
│   ├── MusicToggle.tsx     # Música de fundo
│   └── ComicBackground.tsx # Efeitos flutuantes
└── lib/
    ├── event.ts            # ⭐ Dados do evento (edite aqui)
    └── rsvp-schema.ts      # Validação do formulário
```

---

Feito com 💙❤️ para a Super Vivi.
