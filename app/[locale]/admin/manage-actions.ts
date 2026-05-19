"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { PricingUnit, QuoteStatus } from "@/lib/generated/prisma/enums";

function getSafeLocale(formData: FormData) {
  const locale = formData.get("locale");

  return locale === "ar" ? "ar" : "fr";
}

async function requireAdmin(locale: string) {
  if (!(await isAdminAuthenticated())) {
    redirect(`/${locale}/admin`);
  }
}

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);

  return value.length > 0 ? value : null;
}

function getNumber(formData: FormData, key: string, fallback = 0) {
  const value = Number(formData.get(key));

  return Number.isFinite(value) ? value : fallback;
}

function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function getPricingUnit(formData: FormData) {
  const unit = getString(formData, "unit");

  return Object.values(PricingUnit).includes(unit as PricingUnit)
    ? (unit as PricingUnit)
    : PricingUnit.PIECE;
}

function getQuoteStatus(formData: FormData) {
  const status = getString(formData, "status");

  return Object.values(QuoteStatus).includes(status as QuoteStatus)
    ? (status as QuoteStatus)
    : QuoteStatus.NEW;
}

export async function createCategory(formData: FormData) {
  const locale = getSafeLocale(formData);
  await requireAdmin(locale);

  await prisma.category.create({
    data: {
      slug: getString(formData, "slug"),
      nameFr: getString(formData, "nameFr"),
      nameAr: getString(formData, "nameAr"),
      descriptionFr: getOptionalString(formData, "descriptionFr"),
      descriptionAr: getOptionalString(formData, "descriptionAr"),
      sortOrder: getNumber(formData, "sortOrder"),
      active: getBoolean(formData, "active"),
    },
  });

  revalidatePath(`/${locale}/admin/categories`);
  revalidatePath(`/${locale}/catalogue`);
}

export async function updateCategory(formData: FormData) {
  const locale = getSafeLocale(formData);
  await requireAdmin(locale);

  await prisma.category.update({
    where: { id: getString(formData, "id") },
    data: {
      slug: getString(formData, "slug"),
      nameFr: getString(formData, "nameFr"),
      nameAr: getString(formData, "nameAr"),
      descriptionFr: getOptionalString(formData, "descriptionFr"),
      descriptionAr: getOptionalString(formData, "descriptionAr"),
      sortOrder: getNumber(formData, "sortOrder"),
      active: getBoolean(formData, "active"),
    },
  });

  revalidatePath(`/${locale}/admin/categories`);
  revalidatePath(`/${locale}/catalogue`);
}

export async function deleteCategory(formData: FormData) {
  const locale = getSafeLocale(formData);
  await requireAdmin(locale);

  await prisma.category.delete({
    where: { id: getString(formData, "id") },
  });

  revalidatePath(`/${locale}/admin/categories`);
  revalidatePath(`/${locale}/catalogue`);
}

export async function createProduct(formData: FormData) {
  const locale = getSafeLocale(formData);
  await requireAdmin(locale);

  await prisma.product.create({
    data: {
      slug: getString(formData, "slug"),
      categoryId: getString(formData, "categoryId"),
      nameFr: getString(formData, "nameFr"),
      nameAr: getString(formData, "nameAr"),
      descriptionFr: getString(formData, "descriptionFr"),
      descriptionAr: getString(formData, "descriptionAr"),
      pricePerDay: getString(formData, "pricePerDay"),
      unit: getPricingUnit(formData),
      imageUrl: getOptionalString(formData, "imageUrl"),
      minQuantity: getNumber(formData, "minQuantity", 1),
      availableQuantity: getOptionalString(formData, "availableQuantity")
        ? getNumber(formData, "availableQuantity")
        : null,
      featured: getBoolean(formData, "featured"),
      active: getBoolean(formData, "active"),
      sortOrder: getNumber(formData, "sortOrder"),
    },
  });

  revalidatePath(`/${locale}/admin/products`);
  revalidatePath(`/${locale}/catalogue`);
}

export async function updateProduct(formData: FormData) {
  const locale = getSafeLocale(formData);
  await requireAdmin(locale);

  await prisma.product.update({
    where: { id: getString(formData, "id") },
    data: {
      slug: getString(formData, "slug"),
      categoryId: getString(formData, "categoryId"),
      nameFr: getString(formData, "nameFr"),
      nameAr: getString(formData, "nameAr"),
      descriptionFr: getString(formData, "descriptionFr"),
      descriptionAr: getString(formData, "descriptionAr"),
      pricePerDay: getString(formData, "pricePerDay"),
      unit: getPricingUnit(formData),
      imageUrl: getOptionalString(formData, "imageUrl"),
      minQuantity: getNumber(formData, "minQuantity", 1),
      availableQuantity: getOptionalString(formData, "availableQuantity")
        ? getNumber(formData, "availableQuantity")
        : null,
      featured: getBoolean(formData, "featured"),
      active: getBoolean(formData, "active"),
      sortOrder: getNumber(formData, "sortOrder"),
    },
  });

  revalidatePath(`/${locale}/admin/products`);
  revalidatePath(`/${locale}/catalogue`);
}

export async function deleteProduct(formData: FormData) {
  const locale = getSafeLocale(formData);
  await requireAdmin(locale);

  await prisma.product.delete({
    where: { id: getString(formData, "id") },
  });

  revalidatePath(`/${locale}/admin/products`);
  revalidatePath(`/${locale}/catalogue`);
}

export async function updateQuoteStatus(formData: FormData) {
  const locale = getSafeLocale(formData);
  await requireAdmin(locale);

  await prisma.quoteRequest.update({
    where: { id: getString(formData, "id") },
    data: {
      status: getQuoteStatus(formData),
    },
  });

  revalidatePath(`/${locale}/admin/quotes`);
  revalidatePath(`/${locale}/admin/dashboard`);
}
