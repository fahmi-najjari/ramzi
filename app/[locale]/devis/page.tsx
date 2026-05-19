import { setRequestLocale } from "next-intl/server";

import { QuoteRequestForm } from "@/components/quote-request-form";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DevisPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="bg-gradient-to-b from-muted/60 via-background to-background py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <QuoteRequestForm locale={locale} />
      </div>
    </section>
  );
}
