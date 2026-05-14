import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "HomePage" });

  return (
    <div className="bg-background text-foreground">
      <section className="mx-auto grid min-h-[calc(100dvh-5rem)] w-full max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-5xl font-bold leading-[0.95] text-secondary sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("description")}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogue"
              className="inline-flex h-12 items-center justify-center rounded-md bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              {t("catalogueCta")}
            </Link>
            <Link
              href="/devis"
              className="inline-flex h-12 items-center justify-center rounded-md border bg-card px-6 text-sm font-semibold text-primary transition-colors hover:bg-accent"
            >
              {t("quoteCta")}
            </Link>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            <div>
              <dt className="font-serif text-3xl font-bold text-primary">120+</dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                {t("stats.items")}
              </dd>
            </div>
            <div>
              <dt className="font-serif text-3xl font-bold text-primary">24h</dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                {t("stats.quote")}
              </dd>
            </div>
            <div>
              <dt className="font-serif text-3xl font-bold text-primary">Tunis</dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                {t("stats.service")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-lg border bg-card shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.85),rgba(255,255,255,.2)),radial-gradient(circle_at_20%_20%,hsl(var(--primary)/.28),transparent_34%),radial-gradient(circle_at_90%_30%,hsl(var(--secondary)/.24),transparent_28%)]" />
          <div className="absolute inset-x-8 bottom-8 rounded-lg border bg-background/90 p-6 shadow-xl backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {t("featureLabel")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-secondary">
              {t("featureTitle")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {t("featureText")}
            </p>
          </div>
          <div className="absolute left-8 top-8 grid gap-4">
            <div className="h-36 w-52 rounded-lg border bg-background/85 p-4 shadow-lg backdrop-blur">
              <div className="h-20 rounded-md bg-primary/20" />
              <p className="mt-3 text-sm font-semibold text-secondary">
                {t("visualCards.seating")}
              </p>
            </div>
            <div className="ms-12 h-36 w-52 rounded-lg border bg-background/85 p-4 shadow-lg backdrop-blur">
              <div className="h-20 rounded-md bg-secondary/20" />
              <p className="mt-3 text-sm font-semibold text-secondary">
                {t("visualCards.decor")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
