import { ArrowLeft, Crown } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import {
  CatalogueCard,
  type CatalogueProduct,
} from "@/components/catalogue-card";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const pageContent = {
  fr: {
    eyebrow: "Categorie mariage",
    title: "Assises des maries",
    description:
      "Choisissez le style de siege pour les maries: royal, traditionnel, moderne ou complet avec decor. Chaque option peut etre ajoutee au devis pour construire le pack final.",
    back: "Retour au catalogue",
    labels: {
      add: "Ajouter au devis",
      per: "par",
      seeMore: "Voir plus",
      seeLess: "Reduire",
    },
    products: [
      {
        id: "assise-royale-doree",
        name: "Assise royale doree",
        category: "Premium",
        pricePerDay: 450,
        unit: "set",
        description:
          "Assise principale pour les maries avec finition doree, dossier haut et presence tres elegante. Convient aux grandes salles, tentes premium et espaces photo.",
      },
      {
        id: "assise-traditionnelle",
        name: "Assise traditionnelle",
        category: "Tradition",
        pricePerDay: 320,
        unit: "set",
        description:
          "Salon traditionnel pour les maries avec tissus chaleureux et details tunisiens. Ideal pour une ambiance familiale, authentique et bien presentee.",
      },
      {
        id: "sofa-maries-moderne",
        name: "Sofa maries moderne",
        category: "Moderne",
        pricePerDay: 280,
        unit: "set",
        description:
          "Sofa clair et moderne pour les ceremonies simples ou les decors epures. Facile a integrer avec fleurs, tapis, lumiere et accessoires.",
      },
      {
        id: "pack-assise-decor",
        name: "Pack assise + decor",
        category: "Pack",
        pricePerDay: 650,
        unit: "pack",
        description:
          "Pack complet avec assise des maries, petit decor autour, tapis et accessoires de presentation. Une bonne base pour avoir un espace pret sans composer chaque detail.",
      },
    ],
  },
  ar: {
    eyebrow: "فئة العرس",
    title: "جلسة العروسين",
    description:
      "اختاروا نمط الجلسة الخاصة بالعروسين: ملكية، تقليدية، عصرية أو باقة كاملة مع الديكور. يمكن إضافة كل خيار إلى عرض السعر لبناء الباقة النهائية.",
    back: "الرجوع إلى الكتالوج",
    labels: {
      add: "إضافة للعرض",
      per: "لكل",
      seeMore: "عرض المزيد",
      seeLess: "تقليل",
    },
    products: [
      {
        id: "assise-royale-doree",
        name: "جلسة ملكية ذهبية",
        category: "فاخرة",
        pricePerDay: 450,
        unit: "مجموعة",
        description:
          "جلسة رئيسية للعروسين بتفاصيل ذهبية وظهر عال وحضور أنيق. مناسبة للقاعات الكبيرة، الخيام الفاخرة وفضاءات التصوير.",
      },
      {
        id: "assise-traditionnelle",
        name: "جلسة تقليدية",
        category: "تقليدية",
        pricePerDay: 320,
        unit: "مجموعة",
        description:
          "صالون تقليدي للعروسين بأقمشة دافئة وتفاصيل تونسية. مناسب لأجواء عائلية أصيلة ومنظمة.",
      },
      {
        id: "sofa-maries-moderne",
        name: "صوفا عصرية للعروسين",
        category: "عصرية",
        pricePerDay: 280,
        unit: "مجموعة",
        description:
          "صوفا فاتحة وعصرية للمناسبات البسيطة أو الديكورات الهادئة. سهلة التنسيق مع الورود، الزرابي، الإضاءة والإكسسوارات.",
      },
      {
        id: "pack-assise-decor",
        name: "باقة جلسة + ديكور",
        category: "باقة",
        pricePerDay: 650,
        unit: "باقة",
        description:
          "باقة كاملة تشمل جلسة العروسين، ديكور صغير حولها، زربية وإكسسوارات للعرض. خيار مناسب للحصول على فضاء جاهز دون اختيار كل تفصيل وحده.",
      },
    ],
  },
} satisfies Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    back: string;
    labels: {
      add: string;
      per: string;
      seeMore: string;
      seeLess: string;
    };
    products: CatalogueProduct[];
  }
>;

export default async function AssisesMariesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content =
    pageContent[locale as keyof typeof pageContent] ?? pageContent.fr;

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
              <Crown className="h-12 w-12" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {content.products.map((product) => (
            <CatalogueCard
              key={product.id}
              product={product}
              labels={content.labels}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
