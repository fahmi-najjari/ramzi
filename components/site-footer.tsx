"use client";

import {
  Clock3,
  Languages,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

const catalogueLinks = [
  { href: "/catalogue", key: "catalogue" },
  { href: "/galerie", key: "gallery" },
  { href: "/devis", key: "quote" },
  { href: "/contact", key: "contact" },
] as const;

const supportLinks = [
  { href: "/contact", key: "help" },
  { href: "/devis", key: "customQuote" },
  { href: "/catalogue", key: "rentals" },
] as const;

export function SiteFooter() {
  const locale = useLocale();
  const t = useTranslations("Layout");
  const otherLocale = locale === "ar" ? "fr" : "ar";

  return (
    <footer className="mt-auto border-t border-border bg-card text-card-foreground">
      <div className="border-b border-border bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/15">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              {t("footerCtaEyebrow")}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl">
              {t("footerCtaTitle")}
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogue"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ShoppingBag className="me-2 h-4 w-4" />
              {t("browseCatalogue")}
            </Link>
            <Link
              href="/devis"
              className="inline-flex h-11 items-center justify-center rounded-md bg-secondary px-5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              {t("quoteCta")}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.15fr]">
          <section>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-lg bg-secondary font-serif text-xl font-bold text-primary">
                ر
              </span>
              <span>
                <span className="block font-serif text-2xl font-bold text-secondary">
                  {t("brandName")}
                </span>
                <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  {t("brandTagline")}
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              {t("footerDescription")}
            </p>
            <div className="mt-6 grid max-w-md grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-md border bg-background px-3 py-3">
                <Clock3 className="h-5 w-5 text-primary" />
                <span className="font-medium">{t("footerTrust.fastQuote")}</span>
              </div>
              <div className="flex items-center gap-3 rounded-md border bg-background px-3 py-3">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <span className="font-medium">{t("footerTrust.privateService")}</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-serif text-lg font-bold text-foreground">
              {t("footerSections.shop")}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {catalogueLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-primary"
                  >
                    {t(`footerLinks.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-serif text-lg font-bold text-foreground">
              {t("footerSections.support")}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {supportLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-primary"
                  >
                    {t(`footerLinks.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-serif text-lg font-bold text-foreground">
              {t("footerSections.contact")}
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{t("address")}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+21622123456" className="hover:text-primary">
                  +216 22 123 456
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href="mailto:contact@ramzimechaab.tn"
                  className="hover:text-primary"
                >
                  contact@ramzimechaab.tn
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {t("brandName")}. {t("rights")}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              locale={otherLocale}
              className="inline-flex h-9 items-center rounded-md border px-3 font-semibold uppercase transition-colors hover:border-primary hover:text-primary"
            >
              <Languages className="me-2 h-4 w-4" />
              {otherLocale}
            </Link>
            <Link
              href="/admin"
              className="inline-flex h-9 items-center rounded-md border px-3 font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              {t("admin")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
