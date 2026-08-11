import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import {
  Noto_Sans_Bengali,
  Noto_Serif_Bengali,
  Fjalla_One,
  Libre_Baskerville,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Footer from "@/components/Footer";
import HeaderWrapper from "@/components/HeaderWrapper";
import { getLocale } from "next-intl/server";

const engSans = Fjalla_One({
  variable: "--font-eng-sans",
  subsets: ["latin"],
  weight: "400",
});

const engSerif = Libre_Baskerville({
  variable: "--font-eng-serif",
  subsets: ["latin"],
});

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
  icons: { icon: [{ url: "/favicon.ico", sizes: "48x48" }] },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <>
      <html
        lang={locale}
        className={cn(
          "scroll-smooth",
          "font-sans",
          engSans.variable,
          engSerif.variable,
          bengaliSans.variable,
          bengaliSerif.variable,
        )}
      >
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <body
          className={`${bengaliSans.variable} ${bengaliSerif.variable} antialiased`}
        >
          <NextIntlClientProvider messages={messages}>
            <div className="fade-in">
              <HeaderWrapper />
              <ScrollToTop />
              {children}
              <ScrollToTopButton />
              <Footer />
            </div>
          </NextIntlClientProvider>
          <SpeedInsights />
        </body>
      </html>
      <Analytics />
    </>
  );
}
