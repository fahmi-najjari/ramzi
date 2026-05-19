import type { CatalogueProduct } from "@/components/catalogue-card";
import { PricingUnit } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export type Locale = "fr" | "ar";

export type CategorySeed = {
  slug: string;
  nameFr: string;
  nameAr: string;
  descriptionFr: string;
  descriptionAr: string;
  sortOrder: number;
  products: Array<{
    slug: string;
    nameFr: string;
    nameAr: string;
    descriptionFr: string;
    descriptionAr: string;
    pricePerDay: number;
    unit: PricingUnit;
    imageUrl?: string | null;
    featured?: boolean;
    sortOrder?: number;
  }>;
};

export const categorySeeds: CategorySeed[] = [
  {
    slug: "assises-maries",
    nameFr: "Assises des maries",
    nameAr: "جلسة العروسين",
    descriptionFr:
      "Choisissez le style de siege pour les maries: royal, traditionnel, moderne ou complet avec decor. Chaque option peut etre ajoutee au devis pour construire le pack final.",
    descriptionAr:
      "اختاروا نمط الجلسة الخاصة بالعروسين: ملكية، تقليدية، عصرية أو باقة كاملة مع الديكور. يمكن إضافة كل خيار إلى عرض السعر لبناء الباقة النهائية.",
    sortOrder: 1,
    products: [
      {
        slug: "assise-royale-doree",
        nameFr: "Assise royale doree",
        nameAr: "جلسة ملكية ذهبية",
        descriptionFr:
          "Assise principale pour les maries avec finition doree, dossier haut et presence tres elegante. Convient aux grandes salles, tentes premium et espaces photo.",
        descriptionAr:
          "جلسة رئيسية للعروسين بتفاصيل ذهبية وظهر عال وحضور أنيق. مناسبة للقاعات الكبيرة، الخيام الفاخرة وفضاءات التصوير.",
        pricePerDay: 450,
        unit: PricingUnit.SET,
        featured: true,
      },
      {
        slug: "assise-traditionnelle",
        nameFr: "Assise traditionnelle",
        nameAr: "جلسة تقليدية",
        descriptionFr:
          "Salon traditionnel pour les maries avec tissus chaleureux et details tunisiens. Ideal pour une ambiance familiale, authentique et bien presentee.",
        descriptionAr:
          "صالون تقليدي للعروسين بأقمشة دافئة وتفاصيل تونسية. مناسب لأجواء عائلية أصيلة ومنظمة.",
        pricePerDay: 320,
        unit: PricingUnit.SET,
      },
      {
        slug: "sofa-maries-moderne",
        nameFr: "Sofa maries moderne",
        nameAr: "صوفا عصرية للعروسين",
        descriptionFr:
          "Sofa clair et moderne pour les ceremonies simples ou les decors epures. Facile a integrer avec fleurs, tapis, lumiere et accessoires.",
        descriptionAr:
          "صوفا فاتحة وعصرية للمناسبات البسيطة أو الديكورات الهادئة. سهلة التنسيق مع الورود، الزرابي، الإضاءة والإكسسوارات.",
        pricePerDay: 280,
        unit: PricingUnit.SET,
      },
      {
        slug: "pack-assise-decor",
        nameFr: "Pack assise + decor",
        nameAr: "باقة جلسة + ديكور",
        descriptionFr:
          "Pack complet avec assise des maries, petit decor autour, tapis et accessoires de presentation. Une bonne base pour avoir un espace pret sans composer chaque detail.",
        descriptionAr:
          "باقة كاملة تشمل جلسة العروسين، ديكور صغير حولها، زربية وإكسسوارات للعرض. خيار مناسب للحصول على فضاء جاهز دون اختيار كل تفصيل وحده.",
        pricePerDay: 650,
        unit: PricingUnit.PACK,
        featured: true,
      },
    ],
  },
  {
    slug: "tentes",
    nameFr: "Tentes de mariage",
    nameAr: "خيام الأفراح",
    descriptionFr:
      "Choisissez la tente selon l'espace, le nombre d'invites et le style de la reception. Les prix restent estimatifs et peuvent changer selon le montage, la ville et les options ajoutees.",
    descriptionAr:
      "اختاروا الخيمة حسب المساحة، عدد الضيوف وطابع الحفل. الأسعار تقديرية ويمكن أن تتغير حسب التركيب، المدينة والإضافات.",
    sortOrder: 2,
    products: [
      {
        slug: "tente-petite-reception",
        nameFr: "Petite tente reception",
        nameAr: "خيمة استقبال صغيرة",
        descriptionFr:
          "Tente compacte pour petite reception, fiançailles ou coin buffet. Convient aux espaces limites tout en gardant une presentation propre et festive.",
        descriptionAr:
          "خيمة مدمجة لاستقبال صغير أو خطوبة أو ركن بوفية. مناسبة للمساحات المحدودة مع مظهر منظم واحتفالي.",
        pricePerDay: 450,
        unit: PricingUnit.DAY,
      },
      {
        slug: "tente-moyenne-mariage",
        nameFr: "Tente moyenne mariage",
        nameAr: "خيمة عرس متوسطة",
        descriptionFr:
          "Tente polyvalente pour mariages familiaux et receptions de taille moyenne. Peut accueillir tables, chaises, eclairage et decoration principale.",
        descriptionAr:
          "خيمة متعددة الاستعمالات للأعراس العائلية والاستقبالات المتوسطة. تستوعب الطاولات، الكراسي، الإضاءة والديكور الرئيسي.",
        pricePerDay: 750,
        unit: PricingUnit.DAY,
        featured: true,
      },
      {
        slug: "grande-tente-evenement",
        nameFr: "Grande tente evenement",
        nameAr: "خيمة مناسبات كبيرة",
        descriptionFr:
          "Grande tente pour reception importante avec plusieurs zones: tables invites, assises, buffet, piste et espace photo. Recommandee pour les grands mariages.",
        descriptionAr:
          "خيمة كبيرة لاستقبال مهم مع عدة فضاءات: طاولات الضيوف، الجلسات، البوفية، السهرة وركن التصوير. مناسبة للأعراس الكبيرة.",
        pricePerDay: 1200,
        unit: PricingUnit.DAY,
      },
      {
        slug: "khaima-traditionnelle",
        nameFr: "Khaima traditionnelle",
        nameAr: "خيمة تقليدية",
        descriptionFr:
          "Khaima au style traditionnel tunisien pour une ambiance authentique. Ideal pour les ceremonies familiales, henna, accueil des invites ou coin photo.",
        descriptionAr:
          "خيمة بطابع تونسي تقليدي لأجواء أصيلة. مناسبة للمناسبات العائلية، الحنة، استقبال الضيوف أو ركن التصوير.",
        pricePerDay: 950,
        unit: PricingUnit.DAY,
        featured: true,
      },
    ],
  },
  {
    slug: "tables",
    nameFr: "Tables de reception",
    nameAr: "طاولات الاستقبال",
    descriptionFr:
      "Choisissez les tables selon le nombre d'invites, le type de service et la presentation souhaitee. Les prix sont estimatifs et peuvent varier selon la quantite et les accessoires.",
    descriptionAr:
      "اختاروا الطاولات حسب عدد الضيوف، نوع الخدمة وطريقة العرض المطلوبة. الأسعار تقديرية ويمكن أن تتغير حسب الكمية والإكسسوارات.",
    sortOrder: 3,
    products: [
      {
        slug: "table-ronde-invites",
        nameFr: "Table ronde invites",
        nameAr: "طاولة دائرية للضيوف",
        descriptionFr:
          "Table ronde pour reception et repas assis. Pratique pour organiser les invites par groupes et garder une circulation fluide dans la tente ou la salle.",
        descriptionAr:
          "طاولة دائرية للاستقبال والوجبات الجالسة. عملية لتنظيم الضيوف في مجموعات والحفاظ على حركة سهلة داخل الخيمة أو القاعة.",
        pricePerDay: 35,
        unit: PricingUnit.PIECE,
      },
      {
        slug: "table-longue-banquet",
        nameFr: "Table longue banquet",
        nameAr: "طاولة طويلة banquet",
        descriptionFr:
          "Table longue pour grandes receptions, buffets ou disposition banquet. Une solution efficace pour accueillir plus d'invites dans un espace optimise.",
        descriptionAr:
          "طاولة طويلة للاستقبالات الكبيرة، البوفيات أو ترتيب banquet. حل مناسب لاستقبال عدد أكبر من الضيوف في مساحة منظمة.",
        pricePerDay: 45,
        unit: PricingUnit.PIECE,
      },
      {
        slug: "table-ceremoniale-doree",
        nameFr: "Table ceremoniale doree",
        nameAr: "طاولة مناسبات ذهبية",
        descriptionFr:
          "Table elegante avec finition doree pour gateau, cadeaux, signature, buffet special ou mise en scene d'entree. Ajoute une touche premium au decor.",
        descriptionAr:
          "طاولة أنيقة بتفاصيل ذهبية للحلوى، الهدايا، الإمضاء، البوفية الخاص أو ديكور المدخل. تضيف لمسة فاخرة للديكور.",
        pricePerDay: 65,
        unit: PricingUnit.PIECE,
        featured: true,
      },
      {
        slug: "pack-tables-nappage",
        nameFr: "Pack tables + nappage",
        nameAr: "باقة طاولات + مفارش",
        descriptionFr:
          "Pack de tables avec nappage coordonne pour une reception propre et homogene. Ideal pour demarrer une estimation rapide selon le nombre d'invites.",
        descriptionAr:
          "باقة طاولات مع مفارش منسقة لاستقبال مرتب وموحد. مناسبة لبداية تقدير سريع حسب عدد الضيوف.",
        pricePerDay: 480,
        unit: PricingUnit.PACK,
      },
    ],
  },
  {
    slug: "chaises-salons",
    nameFr: "Chaises & salons invites",
    nameAr: "الكراسي والصالونات للضيوف",
    descriptionFr:
      "Ajoutez les assises pour vos invites: chaises simples, chaises dorees, salons traditionnels ou coins lounge. Chaque option peut etre ajoutee au devis avec son prix et son unite.",
    descriptionAr:
      "أضيفوا جلسات الضيوف: كراسي بسيطة، كراسي ذهبية، صالونات تقليدية أو ركن lounge. كل خيار يمكن إضافته إلى عرض السعر مع السعر والوحدة.",
    sortOrder: 4,
    products: [
      {
        slug: "chaise-doree",
        nameFr: "Chaise doree",
        nameAr: "كرسي ذهبي",
        descriptionFr:
          "Chaise doree elegante pour tables invites, ceremonies et receptions. Une option lumineuse et festive qui s'adapte aux decors modernes comme traditionnels.",
        descriptionAr:
          "كرسي ذهبي أنيق لطاولات الضيوف والمراسم والاستقبالات. خيار مضيء واحتفالي يناسب الديكور العصري والتقليدي.",
        pricePerDay: 8,
        unit: PricingUnit.PIECE,
      },
      {
        slug: "chaise-blanche",
        nameFr: "Chaise blanche",
        nameAr: "كرسي أبيض",
        descriptionFr:
          "Chaise blanche simple et propre pour les grands nombres d'invites. Pratique pour garder un budget maitrise tout en gardant une presentation nette.",
        descriptionAr:
          "كرسي أبيض بسيط ونظيف للأعداد الكبيرة من الضيوف. مناسب للتحكم في الميزانية مع الحفاظ على عرض مرتب.",
        pricePerDay: 5,
        unit: PricingUnit.PIECE,
      },
      {
        slug: "salon-invites-traditionnel",
        nameFr: "Salon invites traditionnel",
        nameAr: "صالون ضيوف تقليدي",
        descriptionFr:
          "Salon traditionnel pour creer un espace invite confortable, familial et chaleureux. Convient aux coins d'accueil, zones photo ou espaces de repos.",
        descriptionAr:
          "صالون تقليدي لإنشاء فضاء ضيوف مريح وعائلي ودافئ. مناسب لأركان الاستقبال أو التصوير أو الراحة.",
        pricePerDay: 180,
        unit: PricingUnit.SET,
      },
      {
        slug: "coin-lounge",
        nameFr: "Coin lounge reception",
        nameAr: "ركن lounge للاستقبال",
        descriptionFr:
          "Coin lounge moderne avec assises confortables pour une reception plus premium. Ideal pour completer une tente, une entree ou un espace proche de la piste.",
        descriptionAr:
          "ركن lounge عصري بجلسات مريحة لاستقبال أكثر فخامة. مناسب لإكمال الخيمة أو المدخل أو فضاء قريب من السهرة.",
        pricePerDay: 260,
        unit: PricingUnit.SET,
      },
    ],
  },
  {
    slug: "eclairage",
    nameFr: "Eclairage & lumieres",
    nameAr: "الإضاءة والأنوار",
    descriptionFr:
      "Ajoutez l'ambiance lumineuse de la reception: lustres, guirlandes, spots et packs complets. Les prix sont estimatifs selon la quantite, la distance et la complexite d'installation.",
    descriptionAr:
      "أضيفوا أجواء الإضاءة للاستقبال: ثريات، أضواء زينة، سبوتات وباقات كاملة. الأسعار تقديرية حسب الكمية، المسافة وصعوبة التركيب.",
    sortOrder: 5,
    products: [
      {
        slug: "lustre-decoratif",
        nameFr: "Lustre decoratif",
        nameAr: "ثريا ديكور",
        descriptionFr:
          "Lustre decoratif pour donner une presence elegante a la tente ou a l'espace central. Convient aux tables principales, coin maries ou entree.",
        descriptionAr:
          "ثريا ديكور تعطي حضورا أنيقا للخيمة أو الفضاء الرئيسي. مناسبة للطاولات الرئيسية، ركن العروسين أو المدخل.",
        pricePerDay: 180,
        unit: PricingUnit.PIECE,
        featured: true,
      },
      {
        slug: "guirlandes-lumineuses",
        nameFr: "Guirlandes lumineuses",
        nameAr: "أضواء زينة",
        descriptionFr:
          "Guirlandes lumineuses pour creer une atmosphere chaleureuse et festive. Ideales autour d'une tente, d'un jardin, d'une entree ou d'une allee.",
        descriptionAr:
          "أضواء زينة لخلق أجواء دافئة واحتفالية. مناسبة حول الخيمة، الحديقة، المدخل أو الممر.",
        pricePerDay: 12,
        unit: PricingUnit.METER,
      },
      {
        slug: "spots-led-reception",
        nameFr: "Spots LED reception",
        nameAr: "سبوتات LED للاستقبال",
        descriptionFr:
          "Set de spots LED pour mettre en valeur le decor, l'entree, la piste ou les zones photo. Peut etre adapte selon les couleurs du theme.",
        descriptionAr:
          "مجموعة سبوتات LED لإبراز الديكور، المدخل، السهرة أو أركان التصوير. يمكن تنسيقها حسب ألوان الثيم.",
        pricePerDay: 90,
        unit: PricingUnit.SET,
      },
      {
        slug: "pack-eclairage-complet",
        nameFr: "Pack eclairage complet",
        nameAr: "باقة إضاءة كاملة",
        descriptionFr:
          "Pack complet avec plusieurs sources de lumiere pour une reception coherente: lustres, lumiere d'ambiance et points forts sur les zones importantes.",
        descriptionAr:
          "باقة كاملة بعدة مصادر إضاءة لاستقبال متناسق: ثريات، إضاءة أجواء ونقاط إضاءة على الفضاءات المهمة.",
        pricePerDay: 420,
        unit: PricingUnit.PACK,
      },
    ],
  },
];

const unitLabels: Record<Locale, Record<PricingUnit, string>> = {
  fr: {
    PIECE: "piece",
    SET: "set",
    DAY: "jour",
    PACK: "pack",
    METER: "metre",
    GUEST: "invite",
  },
  ar: {
    PIECE: "قطعة",
    SET: "مجموعة",
    DAY: "يوم",
    PACK: "باقة",
    METER: "متر",
    GUEST: "ضيف",
  },
};

export const catalogueLabels = {
  fr: {
    add: "Ajouter au devis",
    added: "Ajoute au devis",
    per: "par",
    seeMore: "Voir plus",
    seeLess: "Reduire",
  },
  ar: {
    add: "إضافة للعرض",
    added: "تمت الإضافة للعرض",
    per: "لكل",
    seeMore: "عرض المزيد",
    seeLess: "تقليل",
  },
};

export function normalizeLocale(locale: string): Locale {
  return locale === "ar" ? "ar" : "fr";
}

export async function ensureSeedCatalogue() {
  for (const category of categorySeeds) {
    const savedCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        slug: category.slug,
        nameFr: category.nameFr,
        nameAr: category.nameAr,
        descriptionFr: category.descriptionFr,
        descriptionAr: category.descriptionAr,
        sortOrder: category.sortOrder,
        active: true,
      },
    });

    for (const [index, product] of category.products.entries()) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: {
          slug: product.slug,
          categoryId: savedCategory.id,
          nameFr: product.nameFr,
          nameAr: product.nameAr,
          descriptionFr: product.descriptionFr,
          descriptionAr: product.descriptionAr,
          pricePerDay: product.pricePerDay,
          unit: product.unit,
          imageUrl: product.imageUrl,
          featured: product.featured ?? false,
          active: true,
          sortOrder: product.sortOrder ?? index,
        },
      });
    }
  }
}

export async function getCatalogueProducts(locale: Locale) {
  await ensureSeedCatalogue();

  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: [
      { sortOrder: "asc" },
      { createdAt: "desc" },
    ],
    include: {
      products: {
        where: { active: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      },
    },
  });

  return categories.flatMap((category) => {
    const categoryName = locale === "ar" ? category.nameAr : category.nameFr;

    return category.products.map((product): CatalogueProduct => ({
      id: product.id,
      name: locale === "ar" ? product.nameAr : product.nameFr,
      description: locale === "ar" ? product.descriptionAr : product.descriptionFr,
      category: categoryName,
      pricePerDay: Number(product.pricePerDay),
      unit: unitLabels[locale][product.unit],
      imageUrl: product.imageUrl,
    }));
  });
}

export async function getCategoryPage(slug: string, locale: Locale) {
  await ensureSeedCatalogue();

  const category = await prisma.category.findFirst({
    where: { slug, active: true },
    include: {
      products: {
        where: { active: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      },
    },
  });

  if (!category) {
    return null;
  }

  return {
    eyebrow: locale === "ar" ? "فئة الكتالوج" : "Categorie catalogue",
    title: locale === "ar" ? category.nameAr : category.nameFr,
    description:
      locale === "ar"
        ? (category.descriptionAr ?? "")
        : (category.descriptionFr ?? ""),
    back: locale === "ar" ? "الرجوع إلى الكتالوج" : "Retour au catalogue",
    products: category.products.map((product): CatalogueProduct => ({
      id: product.id,
      name: locale === "ar" ? product.nameAr : product.nameFr,
      description: locale === "ar" ? product.descriptionAr : product.descriptionFr,
      category: locale === "ar" ? category.nameAr : category.nameFr,
      pricePerDay: Number(product.pricePerDay),
      unit: unitLabels[locale][product.unit],
      imageUrl: product.imageUrl,
    })),
  };
}
