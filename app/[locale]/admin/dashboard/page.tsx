import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { logoutAdmin } from "../actions";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDashboardPage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  if (!(await isAdminAuthenticated())) {
    redirect(`/${locale}/admin`);
  }

  const t = await getTranslations({ locale, namespace: "Admin" });

  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              {t("eyebrow")}
            </p>
            <h1 className="font-serif text-4xl font-bold text-secondary md:text-5xl">
              {t("dashboardTitle")}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {t("dashboardDescription")}
            </p>
          </div>
          <form action={logoutAdmin}>
            <input type="hidden" name="locale" value={locale} />
            <button className="h-10 rounded-md border bg-card px-4 text-sm font-semibold text-secondary transition-colors hover:bg-accent">
              {t("logout")}
            </button>
          </form>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["12", t("stats.pendingQuotes")],
            ["4", t("stats.featuredProducts")],
            ["3", t("stats.sections")],
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg border bg-card p-6">
              <p className="font-serif text-4xl font-bold text-primary">
                {value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border bg-card p-6">
          <h2 className="font-serif text-2xl font-bold text-secondary">
            {t("nextTitle")}
          </h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {t("nextDescription")}
          </p>
        </div>
      </div>
    </section>
  );
}
