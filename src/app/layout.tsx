import type { Metadata, Viewport } from "next";
import { Bangers, Poppins } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  variable: "--font-comic",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🦸 Liga dos Heróis — 50 Anos da Super Vivi",
  description:
    "Convocação Oficial da Liga dos Heróis! Celebre os 50 anos da Super Vivi em uma missão épica. 17 de Outubro de 2026, Jacareí-SP. Confirme sua presença!",
  openGraph: {
    title: "🦸 Liga dos Heróis — 50 Anos da Super Vivi",
    description:
      "Você foi convocado para a maior missão do ano! Confirme sua presença na festa de 50 anos da Super Vivi.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1020",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bangers.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b1020] text-white">
        {children}
      </body>
    </html>
  );
}
