import type { Metadata } from "next";
import {
  Playfair_Display,
  Plus_Jakarta_Sans,
  Space_Mono,
} from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { SiteLayout } from "@/components/site-layout";
import { routing } from "@/i18n/routing";
import { QuoteCartProvider } from "@/lib/quote-context";
import "../globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--app-font-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--app-font-serif",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--app-font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Next.js i18n",
  description: "Next.js with next-intl, French, and Arabic.",
};

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <QuoteCartProvider>
            <SiteLayout>{children}</SiteLayout>
          </QuoteCartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
