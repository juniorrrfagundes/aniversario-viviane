// Dados centrais do evento — fácil de editar aqui.

export const EVENT = {
  aniversariante: "Viviane",
  // Fantasia da anfitriã (exclusiva dela).
  heroina: "Supergirl",
  idade: 50,
  // Data e hora do evento (horário de Brasília, UTC-3)
  dataISO: "2026-10-17T20:00:00-03:00",
  dataTexto: "17 de Outubro de 2026",
  horario: "20h00 às 00h00",
  local: {
    nome: "Boomerang Festas e Eventos (Buffet)",
    endereco:
      "R. Lucas Fernandes Pinto, 135 - Cidade Nova Jacareí, Jacareí - SP, 12325-030",
    // Link do mapa (busca pelo endereço)
    mapa: "https://www.google.com/maps/search/?api=1&query=Boomerang+Festas+e+Eventos+Jacarei+R.+Lucas+Fernandes+Pinto+135",
  },
} as const;

export type Categoria = {
  emoji: string;
  titulo: string;
};

export const CATEGORIAS_TORNEIO: Categoria[] = [
  { emoji: "🥇", titulo: "Melhor Fantasia" },
  { emoji: "🥈", titulo: "Fantasia Mais Criativa" },
  { emoji: "🥉", titulo: "Melhor Dupla" },
  { emoji: "🦹", titulo: "Melhor Vilão(ã)" },
  { emoji: "🎖", titulo: "Destaque Geek da Noite" },
];

// Regras do uniforme
export const REGRAS_UNIFORME = [
  "Fantasia completa",
  "Acessórios permitidos",
  "Capas autorizadas",
  "Máscaras opcionais",
  "Criatividade liberada",
];
