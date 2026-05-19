import { setRequestLocale } from "next-intl/server";

import { CatalogueCard } from "@/components/catalogue-card";
import {
  catalogueLabels,
  getCatalogueProducts,
  normalizeLocale,
} from "@/lib/catalogue-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

const pageCopy = {
  fr: {
    eyebrow: "Catalogue location",
    title: "Materiel pour mariages et fetes",
    description:
      "Selectionnez les pieces dont vous avez besoin et ajoutez-les a votre demande de devis. Les prix et images viennent maintenant de l'administration.",
  },
  ar: {
    eyebrow: "كتالوج الكراء",
    title: "تجهيزات للأفراح والمناسبات",
    description:
      "اختاروا القطع التي تحتاجونها وأضيفوها إلى طلب عرض السعر. الأسعار والصور الآن تأتي من لوحة الإدارة.",
  },
};

export default async function CataloguePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const safeLocale = normalizeLocale(locale);
  const content = pageCopy[safeLocale];
  const products = await getCatalogueProducts(safeLocale);

  return (
    <section className="bg-linear-to-b from-muted/60 via-background to-background py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
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
