# 🦸 Roadmap de Desenvolvimento - Liga dos Heróis (50 Anos Viviane)

## 📋 Visão Geral do Projeto

Aplicação web interativa para convite dos 50 anos da Viviane com tema super-heróis. Permite que convidados se registrem, gerem cartões personalizados e interajam com desafios temáticos.

**Data do Evento:** 17 de Outubro de 2026  
**Público:** Convidados e familiares  
**Objetivo:** Engajar e registrar presença dos convidados antes da festa

---

## 🎯 Funcionalidades Principais

### Core (MVP)
- ✅ Landing page temática
- ✅ Formulário de registro (Nome, Nome de Herói, Presença, Acompanhante)
- ✅ Gerador de cartão de herói personalizado
- ✅ QR Code para compartilhamento
- ✅ Lista de heróis confirmados
- ✅ Responsivo (mobile-first)

### Enhanced
- 🎵 Música de fundo com toggle
- 🎭 Animações de super-heróis (raios, escudos, explosões)
- 🎮 Quiz Marvel vs DC
- 🗺️ Caça ao Tesouro (interativa)
- 📸 Galeria de fotos
- 🏆 Placar de competições

---

## 🏗️ Stack Tecnológico Recomendado

### Frontend
- **Framework:** Next.js 14+ (React com SSR)
  - *Por quê:* Excelente para landing pages interativas, otimização de imagens, API Routes integradas
  
- **Styling:** Tailwind CSS + Framer Motion
  - *Por quê:* Rápido para UI temática, animações suaves
  
- **Componentes UI:** Shadcn/ui ou Headless UI
  - *Por quê:* Componentes acessíveis e customizáveis
  
- **Geração de Imagens:** html2canvas + jsPDF
  - *Por quê:* Converte cartão de herói em imagem/PDF para download

### Backend
- **Runtime:** Node.js (integrado no Next.js)
- **Banco de Dados:** Supabase (PostgreSQL)
  - *Por quê:* Oferece PostgreSQL grátis, Auth integrado, Real-time updates
  - *Alternativa:* Firebase (mais simples, menos controle)

- **Autenticação:** Supabase Auth ou Magic Links
  - *Por quê:* Sem complexidade, apenas email/link

- **QR Code:** qrcode.react (frontend) + qr-image (backend para gerar)
  - *Por quê:* Leve, eficiente

### Hospedagem & DevOps
- **Frontend:** Vercel (integrado com Next.js)
  - *Por quê:* Deployment automático, SSL grátis, Serverless Functions
  - *Alternativa:* Netlify, AWS Amplify
  
- **Banco de Dados:** Supabase hosted
  - *Por quê:* Gerenciado e escalável

- **Mídia (fotos, cartões):** Supabase Storage ou AWS S3
  - *Por quê:* Escalável e HTTPS

- **Emails:** SendGrid ou Resend
  - *Por quê:* Confirmação de presença, lembretes

### Ferramentas Adicionais
- **Animações:** Framer Motion ou Three.js
- **Ícones:** Lucide React ou Heroicons
- **Validação:** Zod + React Hook Form
- **Analytics:** Vercel Analytics ou Plausible

---

## 📅 Fases de Desenvolvimento

### **FASE 1: Preparação & Setup (Semana 1)**
**Duração:** 3-5 dias | **Responsável:** DevOps + Frontend Lead

#### Tasks:
1. Configurar repositório Git
2. Setup Next.js 14 com TypeScript
3. Configurar Tailwind CSS + Framer Motion
4. Criar estrutura de pastas

#### Deliverables:
- Projeto rodando localmente
- CI/CD pipeline configurado (GitHub Actions)
- Ambiente de staging preparado

#### Checklist:
- [ ] `npm create next-app@latest` com TypeScript
- [ ] Tailwind CSS instalado e configurado
- [ ] `.env.local` criado (sem secrets)
- [ ] Git workflow documentado (main, develop, feature branches)

---

### **FASE 2: Design & Componentes Base (Semana 1-2)**
**Duração:** 5-7 dias | **Responsável:** Design + Frontend

#### Tasks:
1. Criar design system
   - Cores temáticas (azul SuperGirl, vermelho vilão, dourado heróis)
   - Tipografia em estilo comic/quadrinhos
   - Componentes reutilizáveis

2. Componentes principais:
   - Header com logo/tema
   - Card de Herói
   - Form de Registro
   - Button customizado
   - Modal/Dialog

3. Página de landing básica

#### Deliverables:
- Storybook com componentes
- Design tokens documentados
- Mockups de todas as páginas

#### Checklist:
- [ ] Paleta de cores definida
- [ ] Fonte temática (Google Fonts: Fredoka, Caveat, Permanent Marker)
- [ ] 10+ componentes base criados
- [ ] Responsividade testada (mobile, tablet, desktop)

---

### **FASE 3: Backend & Banco de Dados (Semana 2)**
**Duração:** 3-4 dias | **Responsável:** Backend + DevOps

#### Tasks:
1. Configurar Supabase
   - Criar projeto
   - Configurar PostgreSQL
   - Setup Auth

2. Estrutura de Banco de Dados:
   ```sql
   -- Tabelas
   - users (id, email, nome_civil, nome_heroi)
   - confirmacoes (id, user_id, comparecera, acompanhante, created_at)
   - fotos_heroi (id, user_id, imagem_url, criado_em)
   - placar (id, user_id, categoria, pontos)
   ```

3. API Routes (Next.js)
   - POST /api/auth/register
   - POST /api/confirmacao
   - GET /api/herois-confirmados
   - POST /api/gerar-cartao

#### Deliverables:
- Banco de dados estruturado
- Migrations documentadas
- Postman collection com endpoints

#### Checklist:
- [ ] Supabase project criado
- [ ] Tabelas migrarem sem erro
- [ ] Políticas RLS configuradas
- [ ] Backup automático ativado

---

### **FASE 4: Funcionalidade Principal - Registro (Semana 2-3)**
**Duração:** 4-5 dias | **Responsável:** Full Stack

#### Tasks:
1. Página de Registro
   - Form com validação
   - Captcha (hCaptcha ou Turnstile)
   - Feedback visual (sucesso/erro)

2. Gerador de Cartão de Herói
   - Recebe nome civil + nome de herói
   - Gera imagem personizada (usando canvas ou html2canvas)
   - Download em PNG/PDF
   - Compartilhamento em social media

3. Confirmação de Presença
   - Radio buttons (Sim/Não)
   - Input para acompanhante

#### Deliverables:
- Fluxo completo de registro testado
- Cartões gerados com sucesso
- Dados salvos no banco

#### Checklist:
- [ ] Validação de email
- [ ] Sem duplicatas de registro
- [ ] Cartão renderiza corretamente
- [ ] Download funciona em todos os browsers

---

### **FASE 5: Features Interativas (Semana 3-4)**
**Duração:** 5-7 dias | **Responsável:** Frontend

#### Tasks:
1. **Animações temáticas**
   - Entrada com efeito de raio
   - Explosões ao clicar (particles)
   - Flutuação de ícones
   - Transições entre seções

2. **Música de Fundo**
   - Botão toggle (volume)
   - Loop automático
   - Pause ao minimizar aba

3. **Quiz Marvel vs DC**
   - 5-10 perguntas
   - Placar em tempo real
   - Ranking visual

4. **Caça ao Tesouro**
   - 5 pistas escondidas
   - Dica progressiva
   - Prêmio ao encontrar

#### Deliverables:
- Todas as interações funcionando
- Performance otimizada (Lighthouse > 90)

#### Checklist:
- [ ] 60 FPS em animações
- [ ] Música carrega assincrona
- [ ] Quiz salva respostas
- [ ] Quiz tem tempo limite opcional

---

### **FASE 6: Galeria & Compartilhamento (Semana 4)**
**Duração:** 3-4 dias | **Responsável:** Full Stack

#### Tasks:
1. **QR Code**
   - Gerado para cada cartão
   - Aponta para página do herói

2. **Galeria de Fotos**
   - Upload de fotos (até 5MB)
   - Armazenamento em Supabase Storage
   - Grid responsivo

3. **Compartilhamento Social**
   - Meta tags (OG, Twitter Cards)
   - Botões de share (WhatsApp, Instagram, Facebook)

4. **Página Individual do Herói**
   - `/heroi/[id]` - exibe cartão + informações

#### Deliverables:
- QR Codes funcionando
- Galeria renderizando
- Social share com preview

#### Checklist:
- [ ] QR Code aponta para URL correta
- [ ] Upload trata erros gracefully
- [ ] Meta tags validadas com Facebook Sharing Debugger
- [ ] Link compartilhado mostra preview correto

---

### **FASE 7: Placar & Competições (Semana 4-5)**
**Duração:** 3-4 dias | **Responsável:** Frontend + Backend

#### Tasks:
1. **Placar em Tempo Real**
   - Categoria: Melhor Fantasia
   - Categoria: Mais Criativa
   - Categoria: Melhor Vilão
   - Destaque Geek

2. **Votação**
   - Usuários votam em heróis (1 voto por categoria)
   - Real-time updates com Supabase realtime

3. **Dashboard do Vencedor**
   - Exibe top 3 de cada categoria
   - Animação ao vencer

#### Deliverables:
- Votação funcionando
- Ranking atualizado em tempo real
- Página de vencedores

#### Checklist:
- [ ] Prevent double voting
- [ ] Real-time updates com WebSocket
- [ ] Votação desativada no dia D

---

### **FASE 8: Testes & Otimização (Semana 5)**
**Duração:** 3-4 dias | **Responsável:** QA + Frontend

#### Tasks:
1. **Testes Automatizados**
   - Testes unitários (Jest)
   - Testes de integração (Playwright)
   - E2E: fluxo completo de registro

2. **Performance**
   - Lazy loading de imagens
   - Code splitting
   - Cache estratégico

3. **SEO & Acessibilidade**
   - Meta descriptions
   - alt text em imagens
   - ARIA labels
   - Contrast checker

#### Deliverables:
- Relatório de testes
- Performance report (Lighthouse)
- Accessibility audit

#### Checklist:
- [ ] 90%+ de cobertura de testes
- [ ] Lighthouse score > 90
- [ ] WCAG 2.1 AA compliant
- [ ] Sem console errors

---

### **FASE 9: Deployment & Goes Live (Semana 5-6)**
**Duração:** 2-3 dias | **Responsável:** DevOps + PM

#### Tasks:
1. **Pre-launch**
   - Teste de carga
   - Backup automático
   - Monitoramento configurado

2. **Deploy para Produção**
   - Vercel deployment
   - Custom domain (opcional)
   - SSL configurado

3. **Post-launch**
   - Monitoramento 24/7
   - Suporte a usuários
   - Bug fixes rápidos

#### Deliverables:
- Site ao vivo
- Documentação de suporte
- Runbook para incidentes

#### Checklist:
- [ ] Teste de carga (100+ usuários simultâneos)
- [ ] Backups funcionando
- [ ] Alertas de erro configurados
- [ ] Analytics ativado

---

## 📊 Timeline Consolidada

| Fase | Duração | Inicio | Fim | Status |
|------|---------|--------|-----|--------|
| 1. Setup | 3-5 dias | - | - | 📋 Planejado |
| 2. Design | 5-7 dias | - | - | 📋 Planejado |
| 3. Backend | 3-4 dias | - | - | 📋 Planejado |
| 4. Registro | 4-5 dias | - | - | 📋 Planejado |
| 5. Interativo | 5-7 dias | - | - | 📋 Planejado |
| 6. Galeria | 3-4 dias | - | - | 📋 Planejado |
| 7. Placar | 3-4 dias | - | - | 📋 Planejado |
| 8. Testes | 3-4 dias | - | - | 📋 Planejado |
| 9. Deploy | 2-3 dias | - | - | 📋 Planejado |

**Total:** 4-5 semanas para MVP + features principais

---

## 🗂️ Estrutura de Pastas

```
liga-dos-herois/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── public/
│   ├── images/            # Assets temáticos
│   ├── audios/            # Música de fundo
│   └── fonts/             # Fontes customizadas
├── src/
│   ├── app/               # Next.js 14 app directory
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── heroi/         # Página individual
│   │   ├── placar/        # Ranking
│   │   └── api/           # API routes
│   ├── components/        # Componentes React
│   │   ├── HeroCard.tsx
│   │   ├── RegistrationForm.tsx
│   │   ├── HeroGenerator.tsx
│   │   └── ...
│   ├── lib/               # Utilitários
│   │   ├── supabase.ts
│   │   ├── qrcode.ts
│   │   └── animations.ts
│   ├── styles/            # CSS global + Tailwind
│   ├── types/             # TypeScript interfaces
│   └── hooks/             # Custom React hooks
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.local.example     # Template de env vars
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔐 Variáveis de Ambiente

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxxxxxxx

# Email
SENDGRID_API_KEY=xxxxxxxxxx

# Analytics
NEXT_PUBLIC_GA_ID=xxxxxxxxxx

# QR Code / Compartilhamento
NEXT_PUBLIC_BASE_URL=https://liga-dos-herois.com

# Segurança
CAPTCHA_SECRET_KEY=xxxxxxxxxx
```

---

## ✅ Checklist de Lançamento

- [ ] Todas as funcionalidades testadas
- [ ] Responsividade verificada (mobile, tablet, desktop)
- [ ] Performance otimizada (Lighthouse > 90)
- [ ] SEO implementado
- [ ] Acessibilidade verificada (WCAG 2.1 AA)
- [ ] Banco de dados com backup automático
- [ ] Monitoramento e alertas configurados
- [ ] Documentação completa
- [ ] Time treinado em suporte
- [ ] Plano de contingência para o dia do evento
- [ ] Teste de carga executado
- [ ] Custom domain ativo
- [ ] SSL/HTTPS funcionando

---

## 📞 Contato & Suporte

**Período crítico:** 15/10 a 17/10 (monitora 24/7)  
**Suporte pós-evento:** Arquivar dados, gerar relatório

---

## 🎨 Paleta de Cores Recomendada

```
Primária (SuperGirl): #1E40AF (Azul profundo)
Secundária (Vilão): #DC2626 (Vermelho)
Destaque (Herói): #FBBF24 (Dourado)
Background: #0F172A (Azul muito escuro)
Texto: #F8FAFC (Quase branco)
Accent: #EC4899 (Rosa/Magenta)
```

---

## 🚀 Próximos Passos

1. Confirmar tecnologias com time
2. Criar repositório GitHub
3. Inicializar projeto Next.js
4. Configurar Supabase
5. Começar Fase 1: Setup

---

**Última atualização:** 2026-07-13  
**Versão:** 1.0
