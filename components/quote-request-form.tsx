"use client";

import { CalendarDays, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useActionState, useEffect, useMemo } from "react";

import { submitQuoteRequest } from "@/app/[locale]/devis/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { useQuoteCart } from "@/lib/quote-context";

type QuoteRequestFormProps = {
  locale: string;
};

const copy = {
  fr: {
    title: "Votre demande de devis",
    description:
      "Verifiez les produits selectionnes, ajoutez les details de l'evenement et envoyez la demande.",
    emptyTitle: "Aucun produit selectionne",
    emptyText: "Ajoutez d'abord des produits depuis le catalogue.",
    catalogue: "Voir le catalogue",
    customerTitle: "Informations client",
    name: "Nom complet",
    phone: "Telephone",
    eventDate: "Date de l'evenement",
    city: "Ville / lieu",
    guestCount: "Nombre d'invites",
    eventType: "Type d'evenement",
    message: "Message",
    submit: "Envoyer la demande",
    submitting: "Envoi...",
    estimate: "Total estime",
    note:
      "Le prix final peut changer selon la disponibilite, la ville, la livraison et le montage.",
    successTitle: "Demande envoyee",
    successText:
      "Votre demande a ete enregistree. L'administrateur pourra la consulter dans l'espace admin.",
    eventTypes: {
      WEDDING: "Mariage",
      ENGAGEMENT: "Fiancailles",
      HENNA: "Henna",
      FAMILY_EVENT: "Evenement familial",
      OTHER: "Autre",
    },
  },
  ar: {
    title: "طلب عرض السعر",
    description:
      "راجعوا المنتجات المختارة، أضيفوا تفاصيل المناسبة ثم أرسلوا الطلب.",
    emptyTitle: "لا توجد منتجات مختارة",
    emptyText: "أضيفوا المنتجات أولا من الكتالوج.",
    catalogue: "مشاهدة الكتالوج",
    customerTitle: "معلومات الحريف",
    name: "الاسم الكامل",
    phone: "الهاتف",
    eventDate: "تاريخ المناسبة",
    city: "المدينة / المكان",
    guestCount: "عدد الضيوف",
    eventType: "نوع المناسبة",
    message: "رسالة",
    submit: "إرسال الطلب",
    submitting: "جاري الإرسال...",
    estimate: "المجموع التقديري",
    note:
      "السعر النهائي يمكن أن يتغير حسب التوفر، المدينة، النقل والتركيب.",
    successTitle: "تم إرسال الطلب",
    successText: "تم حفظ طلبكم. يمكن للإدارة مراجعته في فضاء admin.",
    eventTypes: {
      WEDDING: "عرس",
      ENGAGEMENT: "خطوبة",
      HENNA: "حنة",
      FAMILY_EVENT: "مناسبة عائلية",
      OTHER: "أخرى",
    },
  },
};

const initialState = {
  ok: false,
  error: undefined as string | undefined,
  quoteId: undefined as string | undefined,
};

export function QuoteRequestForm({ locale }: QuoteRequestFormProps) {
  const safeLocale = locale === "ar" ? "ar" : "fr";
  const t = copy[safeLocale];
  const {
    items,
    totalEstimate,
    updateQuantity,
    removeItem,
    clearItems,
  } = useQuoteCart();
  const [state, formAction, isPending] = useActionState(
    submitQuoteRequest,
    initialState,
  );
  const serializedItems = useMemo(
    () =>
      JSON.stringify(
        items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      ),
    [items],
  );

  useEffect(() => {
    if (state.ok) {
      clearItems();
    }
  }, [clearItems, state.ok]);

  if (state.ok) {
    return (
      <Card className="mx-auto max-w-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="font-serif text-3xl text-secondary">
            {t.successTitle}
          </CardTitle>
          <CardDescription className="leading-6">
            {t.successText}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="rounded-lg border bg-muted px-4 py-3 text-sm text-muted-foreground">
            ID: {state.quoteId}
          </p>
        </CardContent>
        <CardFooter>
          <Link
            href="/catalogue"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {t.catalogue}
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
      <div className="space-y-5">
        <div>
          <h1 className="font-serif text-4xl font-bold text-secondary md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t.description}
          </p>
        </div>

        {items.length === 0 ? (
          <Card className="rounded-2xl">
            <CardHeader className="text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-primary/50" />
              <CardTitle className="font-serif text-2xl text-secondary">
                {t.emptyTitle}
              </CardTitle>
              <CardDescription>{t.emptyText}</CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <Link
                href="/catalogue"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {t.catalogue}
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} className="rounded-2xl">
                <CardContent className="flex items-center gap-4 p-4">
                  {item.product.imageUrl ? (
                    // Product image URLs may be remote/user supplied.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-muted">
                      <ShoppingBag className="h-7 w-7 text-primary/50" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif text-xl font-bold text-foreground">
                      {item.product.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {item.product.pricePerDay} TND / {item.product.unit}
                    </p>
                    <p className="mt-1 font-semibold text-primary">
                      {item.product.pricePerDay * item.quantity} TND
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Card className="h-fit rounded-2xl">
        <CardHeader>
          <CardTitle className="font-serif text-2xl text-secondary">
            {t.customerTitle}
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {t.note}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.error && (
            <div className="mb-5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {state.error}
            </div>
          )}
          <form action={formAction} className="grid gap-4">
            <input type="hidden" name="locale" value={safeLocale} />
            <input type="hidden" name="items" value={serializedItems} />
            <Field name="customerName" label={t.name} required />
            <Field name="phone" label={t.phone} required />
            <Field name="eventDate" label={t.eventDate} type="date" />
            <Field name="city" label={t.city} />
            <Field name="guestCount" label={t.guestCount} type="number" />
            <label className="grid gap-2 text-sm font-medium">
              {t.eventType}
              <select
                name="eventType"
                className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                defaultValue="WEDDING"
              >
                {Object.entries(t.eventTypes).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium">
              {t.message}
              <textarea
                name="message"
                className="min-h-28 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </label>

            <div className="rounded-xl border bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{t.estimate}</span>
                <span className="font-serif text-2xl font-bold text-primary">
                  {totalEstimate} TND
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {t.note}
              </p>
            </div>

            <Button
              className="h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90"
              disabled={items.length === 0 || isPending}
            >
              {isPending ? t.submitting : t.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <input
        {...props}
        className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
      />
    </label>
  );
}
