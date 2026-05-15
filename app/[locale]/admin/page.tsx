import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { loginAdmin } from "./actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { error } = await searchParams;

  setRequestLocale(locale);

  if (await isAdminAuthenticated()) {
    redirect(`/${locale}/admin/dashboard`);
  }

  const t = await getTranslations({ locale, namespace: "Admin" });

  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-md px-4">
        <div className="rounded-lg border bg-card p-8 shadow-xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-4xl font-bold text-secondary">
            {t("loginTitle")}
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {t("loginDescription")}
          </p>

          {error === "1" && (
            <div className="mt-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {t("invalidCredentials")}
            </div>
          )}

          <form action={loginAdmin} className="mt-8 grid gap-5">
            <input type="hidden" name="locale" value={locale} />
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="username">
                {t("username")}
              </label>
              <input
                id="username"
                name="username"
                required
                autoComplete="username"
                className="h-11 rounded-md border bg-background px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="password">
                {t("password")}
              </label>
              <input
                id="password"
                name="password"
                required
                type="password"
                autoComplete="current-password"
                className="h-11 rounded-md border bg-background px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <button className="h-11 rounded-md bg-secondary px-4 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90">
              {t("loginButton")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
