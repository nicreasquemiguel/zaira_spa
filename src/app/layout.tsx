import type { Metadata } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-bodoni",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZAIRA Beauty Studio · Donde tu belleza florece",
  description:
    "Un estudio donde el cuidado se vuelve ritual. Tratamientos faciales, corporales y de la mirada, pensados para realzar —con delicadeza— lo que ya eres.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bodoniModa.variable} ${cormorantGaramond.variable} ${jost.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
