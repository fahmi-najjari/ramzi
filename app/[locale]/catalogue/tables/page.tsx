import { Table2 } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { CategoryPage } from "@/components/category-page";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export default async function TablesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CategoryPage locale={locale} slug="tables" Icon={Table2} />;
}
