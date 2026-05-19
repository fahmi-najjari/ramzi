import {
  ArrowRight,
  Calculator,
  ClipboardCheck,
  Crown,
  Lightbulb,
  Sparkles,
  Table2,
  Tent,
  Users,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const featuredProducts = [
  {
    id: "khaima-royale",
    imageUrl: null,
    pricePerDay: 950,
    unit: "jour",
    href: "/catalogue/tentes",
  },
  {
    id: "lustre-andalou",
    imageUrl: null,
    pricePerDay: 180,
    unit: "piece",
    href: "/catalogue/eclairage",
  },
  {
    id: "salon-traditionnel",
    imageUrl: null,
    pricePerDay: 420,
    unit: "set",
    href: "/catalogue/chaises-salons",
  },
  {
    id: "table-doree",
    imageUrl: null,
    pricePerDay: 65,
    unit: "piece",
    href: "/catalogue/tables",
  },
];

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
  const packageCategories = [
    { key: "coupleSeating", icon: Crown, href: "/catalogue/assises-maries" },
    { key: "tents", icon: Tent, href: "/catalogue/tentes" },
    { key: "tables", icon: Table2, href: "/catalogue/tables" },
    { key: "guestSeating", icon: Users, href: "/catalogue/chaises-salons" },
    { key: "lighting", icon: Lightbulb, href: "/catalogue/eclairage" },
    { key: "decor", icon: Sparkles, href: "/catalogue" },
  ] as const;
  const quoteSteps = [
    { key: "choose", icon: Sparkles },
    { key: "estimate", icon: Calculator },
    { key: "confirm", icon: ClipboardCheck },
  ] as const;

  return (
    <>
      <section className="relative flex h-[80vh] min-h-[600px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-modern.png"
            alt={t("heroImageAlt")}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/45 via-secondary/15 to-primary/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <p className="mb-5 font-serif text-4xl font-bold leading-tight text-primary drop-shadow-sm sm:text-5xl md:text-7xl">
            {t("brandDisplay")}
          </p>
          <h1 className="mx-auto mb-6 max-w-4xl rounded-lg bg-background/72 px-5 py-4 font-serif text-4xl leading-tight text-foreground shadow-sm backdrop-blur-sm md:text-6xl">
            {t("titleBeforeBreak")}
            <br /> <span className="text-primary">{t("titleAccent")}</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl rounded-md bg-background/68 px-5 py-3 text-lg font-medium text-foreground shadow-sm backdrop-blur-sm md:text-xl">
            {t("description")}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/catalogue"
              className="inline-flex h-14 w-full items-center justify-center bg-primary px-8 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
            >
              {t("catalogueCta")}
            </Link>
            <Link
              href="/galerie"
              className="inline-flex h-14 w-full items-center justify-center border border-white/30 bg-background/10 px-8 text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-secondary sm:w-auto"
            >
              {t("galleryCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-muted/55 via-background to-muted/25 py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              {t("builderEyebrow")}
            </p>
            <h2 className="mb-4 font-serif text-3xl text-secondary md:text-4xl">
              {t("builderTitle")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("builderDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {packageCategories.map((item) => (
              <Link key={item.key} href={item.href} className="group block">
                <Card className="h-full rounded-2xl border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <item.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="font-serif text-xl text-secondary">
                      {t(`packageCategories.${item.key}.title`)}
                    </CardTitle>
                    <CardDescription className="leading-6">
                      {t(`packageCategories.${item.key}.text`)}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              {t("quoteFlowEyebrow")}
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl">
              {t("quoteFlowTitle")}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              {t("quoteFlowDescription")}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              {quoteSteps.map((step, index) => (
                <Card key={step.key} className="rounded-2xl">
                  <CardHeader>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-primary">
                        0{index + 1}
                      </span>
                      <step.icon className="h-5 w-5 text-secondary" />
                    </div>
                    <CardTitle className="font-serif text-lg">
                      {t(`quoteSteps.${step.key}.title`)}
                    </CardTitle>
                    <CardDescription className="leading-6">
                      {t(`quoteSteps.${step.key}.text`)}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <Card className="rounded-3xl border-primary/20 bg-gradient-to-br from-card via-muted/55 to-primary/10 p-0 shadow-xl">
            <CardHeader className="border-b">
              <CardTitle className="font-serif text-2xl text-secondary">
                {t("estimateCard.title")}
              </CardTitle>
              <CardDescription>{t("estimateCard.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {["couple", "tent", "tables", "decor"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border bg-background/80 px-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">
                    {t(`estimateCard.items.${item}.label`)}
                  </span>
                  <span className="font-serif text-lg font-bold text-secondary">
                    {t(`estimateCard.items.${item}.price`)}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t pt-4">
                <span className="font-semibold text-foreground">
                  {t("estimateCard.totalLabel")}
                </span>
                <span className="font-serif text-3xl font-bold text-primary">
                  {t("estimateCard.total")}
                </span>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                {t("estimateCard.note")}
              </p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Link
                href="/catalogue"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-secondary px-5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
              >
                {t("estimateCard.cta")}
                <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="bg-secondary py-24 text-secondary-foreground">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-primary">
                {t("popularEyebrow")}
              </span>
              <h2 className="font-serif text-3xl text-white md:text-5xl">
                {t("popularTitle")}
              </h2>
            </div>
            <Link
              href="/catalogue"
              className="inline-flex h-10 items-center justify-center border border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t("allCatalogue")}
              <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="group block"
              >
                <Card className="h-full overflow-hidden rounded-2xl border-white/15 bg-white/[0.08] p-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.12] hover:shadow-xl hover:shadow-black/10">
                  <div className="relative aspect-square overflow-hidden bg-white/10">
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.imageUrl}
                        alt={t(`products.${product.id}`)}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Sparkles className="h-12 w-12 text-primary/65" />
                      </div>
                    )}
                    <div className="absolute end-3 top-3 max-w-[78%] rounded-xl bg-background/90 px-3 py-2 text-end shadow-sm backdrop-blur-md">
                      <h3 className="font-serif text-lg font-bold leading-tight text-foreground">
                        {t(`products.${product.id}`)}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="flex flex-1 flex-col p-5">
                    <p className="text-sm text-white/65">
                      {t("popularCardDescription")}
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto flex items-center justify-between border-t border-white/10 p-5">
                    <span className="font-bold text-primary">
                      {product.pricePerDay} TND
                    </span>
                    <span className="text-sm text-white/60">
                      / {product.unit}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
