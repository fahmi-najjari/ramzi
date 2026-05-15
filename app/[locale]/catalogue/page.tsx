import { setRequestLocale } from "next-intl/server";

import {
  CatalogueCard,
  type CatalogueProduct,
} from "@/components/catalogue-card";

type Props = {
  params: Promise<{ locale: string }>;
};

const catalogueContent = {
  fr: {
    eyebrow: "Catalogue location",
    title: "Materiel pour mariages et fetes",
    description:
      "Selectionnez les pieces dont vous avez besoin et ajoutez-les a votre demande de devis. Les descriptions restent compactes pour garder la grille facile a parcourir.",
    labels: {
      add: "Ajouter au devis",
      per: "par",
      seeMore: "Voir plus",
      seeLess: "Reduire",
    },
    products: [
      {
        id: "khaima-royale",
        name: "Khaima de reception",
        category: "Tentes",
        pricePerDay: 950,
        unit: "jour",
        description:
          "Grande tente de reception pour mariages, fiancailles et ceremonies familiales. Installation elegante avec structure stable, drapage clair et espace confortable pour accueillir les invites.",
      },
      {
        id: "lustre-andalou",
        name: "Lustre decoratif",
        category: "Lumiere",
        pricePerDay: 180,
        unit: "piece",
        description:
          "Lustre decoratif pour apporter une ambiance chaleureuse et premium a la reception. Ideal au-dessus des tables, dans une tente ou dans un espace photo.",
      },
      {
        id: "salon-traditionnel",
        name: "Salon traditionnel",
        category: "Mobilier",
        pricePerDay: 420,
        unit: "set",
        description:
          "Salon traditionnel soigneusement prepare pour creer un coin invite, famille ou photo. Les couleurs et accessoires peuvent etre adaptes selon le style de la fete.",
      },
      {
        id: "table-doree",
        name: "Table ceremoniale",
        category: "Reception",
        pricePerDay: 65,
        unit: "piece",
        description:
          "Table ceremoniale avec finition elegante pour buffet, gateaux, cadeaux ou presentation. Convient aux espaces modernes comme aux decors traditionnels.",
      },
    ],
  },
  ar: {
    eyebrow: "كتالوج الكراء",
    title: "تجهيزات للأفراح والمناسبات",
    description:
      "اختاروا القطع التي تحتاجونها وأضيفوها إلى طلب عرض السعر. الوصف يبقى مختصرا لتصفح المنتجات بسهولة.",
    labels: {
      add: "إضافة للعرض",
      per: "لكل",
      seeMore: "عرض المزيد",
      seeLess: "تقليل",
    },
    products: [
      {
        id: "khaima-royale",
        name: "خيمة استقبال",
        category: "خيام",
        pricePerDay: 950,
        unit: "يوم",
        description:
          "خيمة استقبال كبيرة لحفلات الزفاف والخطوبة والمناسبات العائلية. تركيب أنيق مع هيكل ثابت وستائر فاتحة ومساحة مريحة لاستقبال الضيوف.",
      },
      {
        id: "lustre-andalou",
        name: "ثريا ديكور",
        category: "إضاءة",
        pricePerDay: 180,
        unit: "قطعة",
        description:
          "ثريا ديكور تضيف أجواء دافئة وراقية للحفل. مناسبة فوق الطاولات أو داخل الخيمة أو في فضاء التصوير.",
      },
      {
        id: "salon-traditionnel",
        name: "صالون تقليدي",
        category: "أثاث",
        pricePerDay: 420,
        unit: "مجموعة",
        description:
          "صالون تقليدي محضر بعناية لإنشاء ركن للضيوف أو العائلة أو التصوير. يمكن تنسيق الألوان والإكسسوارات حسب طابع المناسبة.",
      },
      {
        id: "table-doree",
        name: "طاولة مناسبات",
        category: "استقبال",
        pricePerDay: 65,
        unit: "قطعة",
        description:
          "طاولة مناسبات بتفاصيل أنيقة للبوفية أو الحلوى أو الهدايا أو العرض. مناسبة للديكورات الحديثة والتقليدية.",
      },
    ],
  },
} satisfies Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    labels: {
      add: string;
      per: string;
      seeMore: string;
      seeLess: string;
    };
    products: CatalogueProduct[];
  }
>;

export default async function CataloguePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content =
    catalogueContent[locale as keyof typeof catalogueContent] ??
    catalogueContent.fr;

  return (
    <section className="bg-gradient-to-b from-muted/60 via-background to-background py-16 md:py-20">
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
