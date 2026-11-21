import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "BDL Al Badil — Banque de Développement Local | DRE BOUIRA - 841 -",
  description:
    "Simulateur de financement islamique Mourabaha Consommation — Al Badil par la Banque de Développement Local (BDL) — Direction Régionale d'Exploitation DRE BOUIRA - 841 -",
  keywords: ["mourabaha", "financement", "islamique", "algérie", "simulation", "bdl", "badil", "bouira"],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
