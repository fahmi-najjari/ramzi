import { Package, Tags, FileText, LayoutDashboard } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { logoutAdmin } from "@/app/[locale]/admin/actions";

type AdminShellProps = {
  children: React.ReactNode;
  locale: string;
  title: string;
  description: string;
};

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/quotes", label: "Quote requests", icon: FileText },
] as const;

export function AdminShell({
  children,
  locale,
  title,
  description,
}: AdminShellProps) {
  return (
    <section className="bg-background py-12">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="h-fit rounded-2xl border bg-card p-4 shadow-sm">
          <div className="border-b pb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Admin
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-secondary">
              Control
            </h2>
          </div>
          <nav className="mt-4 grid gap-1">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <form action={logoutAdmin} className="mt-6 border-t pt-4">
            <input type="hidden" name="locale" value={locale} />
            <button className="h-10 w-full rounded-md border bg-background px-4 text-sm font-semibold text-secondary transition-colors hover:bg-accent">
              Logout
            </button>
          </form>
        </aside>

        <main>
          <div className="mb-8 border-b pb-6">
            <h1 className="font-serif text-4xl font-bold text-secondary md:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              {description}
            </p>
          </div>
          {children}
        </main>
      </div>
    </section>
  );
}
