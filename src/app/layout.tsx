import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Noto_Sans_Bengali, Noto_Serif_Bengali, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const bengaliSans = Noto_Sans_Bengali({
  variable: "--font-bengali-sans",
  subsets: ["bengali"],
});

const bengaliSerif = Noto_Serif_Bengali({
  variable: "--font-bengali-serif",
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: "Antarjatik Path",
  description: "Central Organ of the Bolshevik Leninist Party, India",
  keywords:
    "Antarjatik Path, Bolshevik, Leninist, India, Politics, BLPI, Marxism, Marxist, Journal, Theory, Articles, Communism, Trotskyism, Trotsky, Lenin, Marx, Engels, Rosa Luxemburg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="bn" className={cn("scroll-smooth", "font-sans", inter.variable)}>
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body
          className={`${bengaliSans.variable} ${bengaliSerif.variable} antialiased`}
        >
          {children}
          <SpeedInsights/>
        </body>
      </html>
      <Analytics />
    </>
  );
}
