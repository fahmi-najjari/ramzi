import { Package, Tags, FileText } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin-shell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ locale: string }>;
};

const dashboardLinks = [
  {
    href: "/admin/categories",
    title: "Categories",
    description: "Add and edit product categories.",
    icon: Tags,
  },
  {
    href: "/admin/products",
    title: "Products",
    description: "Adjust prices, names, descriptions, and image URLs.",
    icon: Package,
  },
  {
    href: "/admin/quotes",
    title: "Quote requests",
    description: "Review customer quote requests.",
    icon: FileText,
  },
] as const;

export default async function AdminDashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!(await isAdminAuthenticated())) {
    redirect(`/${locale}/admin`);
  }

  const [categories, products, quotes] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.quoteRequest.count(),
  ]);

  return (
    <AdminShell
      locale={locale}
      title="Dashboard"
      description="Manage the rental catalogue from separate admin sections."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Categories", categories],
          ["Products", products],
          ["Quote requests", quotes],
        ].map(([label, value]) => (
          <Card key={label} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="font-serif text-4xl text-primary">
                {value}
              </CardTitle>
              <CardDescription>{label}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {dashboardLinks.map((item) => (
          <Link key={item.href} href={item.href} className="group block">
            <Card className="h-full rounded-2xl transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
              <CardHeader>
                <item.icon className="mb-4 h-7 w-7 text-primary" />
                <CardTitle className="font-serif text-2xl text-secondary">
                  {item.title}
                </CardTitle>
                <CardDescription className="leading-6">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
