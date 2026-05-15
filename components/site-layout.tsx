"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useRouter } from "@/i18n/navigation";
import { useQuoteCart } from "@/lib/quote-context";

const navItems = [
  { href: "/", key: "home" },
  { href: "/catalogue", key: "catalogue" },
  { href: "/galerie", key: "gallery" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Layout");
  const { items, itemCount, updateQuantity, removeItem, totalEstimate } =
    useQuoteCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const otherLocale = locale === "ar" ? "fr" : "ar";

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-secondary font-serif text-xl font-bold text-primary shadow-sm">
              ر
            </span>
            <span className="leading-none">
              <span className="block font-serif text-xl font-bold text-secondary sm:text-2xl">
                {t("brandName")}
              </span>
              <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {t("brandTagline")}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center rounded-full border bg-card/80 p-1 text-sm font-medium text-muted-foreground shadow-sm lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-full px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              locale={otherLocale}
              className="hidden h-10 items-center rounded-md border border-border bg-card px-3 text-sm font-semibold uppercase text-muted-foreground transition-colors hover:text-primary sm:inline-flex"
            >
              {otherLocale}
            </Link>
            <Button
              className="hidden bg-secondary px-5 text-secondary-foreground hover:bg-secondary/90 md:inline-flex"
              onClick={() => router.push("/devis")}
            >
              {t("quoteCta")}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative border-primary/25 bg-card text-primary hover:bg-primary/10"
                  aria-label={t("quoteTitle")}
                >
                  <ShoppingBag className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-xs font-bold text-secondary-foreground">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full border-s-0 shadow-2xl sm:max-w-lg">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle className="font-serif text-2xl text-secondary">
                    {t("quoteTitle")}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-muted-foreground">
                      <ShoppingBag className="h-12 w-12 opacity-20" />
                      <p>{t("emptyQuote")}</p>
                      <Button
                        variant="outline"
                        onClick={() => router.push("/catalogue")}
                      >
                        {t("browseCatalogue")}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center gap-4 rounded-lg border bg-card p-3"
                        >
                          {item.product.imageUrl ? (
                            // Product image URLs may be remote/user supplied.
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="h-16 w-16 rounded-md object-cover"
                            />
                          ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
                              <ShoppingBag className="h-6 w-6 text-muted-foreground/30" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate font-medium text-foreground">
                              {item.product.name}
                            </h4>
                            <p className="text-sm font-bold text-primary">
                              {item.product.pricePerDay} TND / {item.product.unit}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center overflow-hidden rounded-md border">
                              <button
                                className="bg-muted px-2 py-1 text-sm hover:bg-accent"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                  )
                                }
                              >
                                -
                              </button>
                              <span className="w-8 px-3 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                className="bg-muted px-2 py-1 text-sm hover:bg-accent"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.product.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {items.length > 0 && (
                  <div className="mt-auto border-t p-4">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">
                        {t("dailyEstimate")}
                      </span>
                      <span className="font-serif text-xl font-bold text-secondary">
                        {totalEstimate} TND
                      </span>
                    </div>
                    <Button
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      onClick={() => router.push("/devis")}
                    >
                      {t("quoteCta")}
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={locale === "ar" ? "right" : "left"}
                className="w-[320px] border-e-0"
              >
                <nav className="mt-10 flex flex-col gap-2 px-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-md px-3 py-3 font-serif text-lg transition-colors hover:bg-accent"
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  ))}
                  <Link
                    href="/"
                    locale={otherLocale}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-4 rounded-md border px-3 py-3 text-sm font-semibold uppercase text-primary"
                  >
                    {t("language")}: {otherLocale}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
}
