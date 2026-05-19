import { ArrowLeft, LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";

import { CatalogueCard } from "@/components/catalogue-card";
import { Link } from "@/i18n/navigation";
import {
  catalogueLabels,
  getCategoryPage,
  normalizeLocale,
} from "@/lib/catalogue-data";

type CategoryPageProps = {
  locale: string;
  slug: string;
  Icon: LucideIcon;
};

export async function CategoryPage({ locale, slug, Icon }: CategoryPageProps) {
  const safeLocale = normalizeLocale(locale);
  const content = await getCategoryPage(slug, safeLocale);

  if (!content) {
    notFound();
  }

  return (
    <section className="bg-gradient-to-b from-muted/60 via-background to-background py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/catalogue"
          className="mb-8 inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-secondary"
        >
          <ArrowLeft className="me-2 h-4 w-4 rtl:rotate-180" />
          {content.back}
        </Link>

        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.35fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              {content.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold text-foreground md:text-6xl">
              {content.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              {content.description}
            </p>
          </div>
          <div className="hidden justify-end lg:flex">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <Icon className="h-12 w-12" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {content.products.map((product) => (
            <CatalogueCard
              key={product.id}
              product={product}
              labels={catalogueLabels[safeLocale]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
