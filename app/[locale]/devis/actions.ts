"use server";

import { revalidatePath } from "next/cache";

import { EventType } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

type QuoteActionState = {
  ok: boolean;
  error?: string;
  quoteId?: string;
};

type SubmittedItem = {
  productId: string;
  quantity: number;
};

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);

  return value.length > 0 ? value : null;
}

function getLocale(formData: FormData) {
  return getString(formData, "locale") === "ar" ? "ar" : "fr";
}

function getEventType(formData: FormData) {
  const value = getString(formData, "eventType");

  return Object.values(EventType).includes(value as EventType)
    ? (value as EventType)
    : EventType.WEDDING;
}

function parseItems(formData: FormData): SubmittedItem[] {
  const rawItems = getString(formData, "items");

  if (!rawItems) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawItems) as Array<{
      productId?: unknown;
      quantity?: unknown;
    }>;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => ({
        productId: typeof item.productId === "string" ? item.productId : "",
        quantity:
          typeof item.quantity === "number" && Number.isFinite(item.quantity)
            ? Math.max(1, Math.floor(item.quantity))
            : 1,
      }))
      .filter((item) => item.productId.length > 0);
  } catch {
    return [];
  }
}

export async function submitQuoteRequest(
  _previousState: QuoteActionState,
  formData: FormData,
): Promise<QuoteActionState> {
  const locale = getLocale(formData);
  const customerName = getString(formData, "customerName");
  const phone = getString(formData, "phone");
  const items = parseItems(formData);

  if (!customerName || !phone) {
    return {
      ok: false,
      error:
        locale === "ar"
          ? "الاسم ورقم الهاتف مطلوبان."
          : "Le nom et le telephone sont obligatoires.",
    };
  }

  if (items.length === 0) {
    return {
      ok: false,
      error:
        locale === "ar"
          ? "أضيفوا منتجا واحدا على الأقل قبل إرسال الطلب."
          : "Ajoutez au moins un produit avant d'envoyer la demande.",
    };
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: items.map((item) => item.productId),
      },
      active: true,
    },
  });
  const productsById = new Map(products.map((product) => [product.id, product]));

  const quoteItems = items
    .map((item) => {
      const product = productsById.get(item.productId);

      if (!product) {
        return null;
      }

      const unitPrice = Number(product.pricePerDay);
      const subtotal = unitPrice * item.quantity;

      return {
        product,
        quantity: item.quantity,
        unitPrice,
        subtotal,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (quoteItems.length === 0) {
    return {
      ok: false,
      error:
        locale === "ar"
          ? "المنتجات المختارة لم تعد متوفرة."
          : "Les produits selectionnes ne sont plus disponibles.",
    };
  }

  const totalEstimate = quoteItems.reduce(
    (total, item) => total + item.subtotal,
    0,
  );
  const eventDate = getOptionalString(formData, "eventDate");
  const guestCount = Number(getOptionalString(formData, "guestCount"));

  const quoteRequest = await prisma.quoteRequest.create({
    data: {
      customerName,
      phone,
      eventDate: eventDate ? new Date(`${eventDate}T12:00:00`) : null,
      city: getOptionalString(formData, "city"),
      guestCount: Number.isFinite(guestCount) ? guestCount : null,
      eventType: getEventType(formData),
      message: getOptionalString(formData, "message"),
      totalEstimate,
      items: {
        create: quoteItems.map((item) => ({
          productId: item.product.id,
          productSnapshotName:
            locale === "ar" ? item.product.nameAr : item.product.nameFr,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.subtotal,
        })),
      },
    },
  });

  revalidatePath(`/${locale}/admin/quotes`);

  return {
    ok: true,
    quoteId: quoteRequest.id,
  };
}
