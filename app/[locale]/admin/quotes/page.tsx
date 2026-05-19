import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { QuoteStatus } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { updateQuoteStatus } from "../manage-actions";

type Props = {
  params: Promise<{ locale: string }>;
};

const statusLabels: Record<QuoteStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  CONFIRMED: "Confirmed",
  REJECTED: "Rejected",
  COMPLETED: "Completed",
};

const statusStyles: Record<QuoteStatus, string> = {
  NEW: "border-amber-200 bg-amber-50 text-amber-700",
  CONTACTED: "border-blue-200 bg-blue-50 text-blue-700",
  CONFIRMED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  REJECTED: "border-rose-200 bg-rose-50 text-rose-700",
  COMPLETED: "border-slate-200 bg-slate-50 text-slate-700",
};

function formatDate(date: Date | null) {
  if (!date) {
    return "No date";
  }

  return new Intl.DateTimeFormat("fr-TN", {
    dateStyle: "medium",
  }).format(date);
}

export default async function AdminQuotesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!(await isAdminAuthenticated())) {
    redirect(`/${locale}/admin`);
  }

  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <AdminShell
      locale={locale}
      title="Quote requests"
      description="Track customer requests, update their status, and review selected products."
    >
      {quotes.length === 0 ? (
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-secondary">
              No quote requests yet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Customer quote requests will appear here after they submit the
              devis form.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5">
          {quotes.map((quote) => (
            <Card key={quote.id} className="rounded-2xl">
              <CardHeader className="gap-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <CardTitle className="font-serif text-2xl text-secondary">
                        {quote.customerName}
                      </CardTitle>
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${statusStyles[quote.status]}`}
                      >
                        {statusLabels[quote.status]}
                      </span>
                    </div>
                    <div className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
                      <span>{quote.phone}</span>
                      <span>{formatDate(quote.eventDate)}</span>
                      <span>{quote.city ?? "No city"}</span>
                      <span>{quote.guestCount ?? 0} guests</span>
                      <span>{quote.eventType}</span>
                      <span className="font-semibold text-secondary">
                        {quote.totalEstimate.toString()} TND
                      </span>
                    </div>
                  </div>

                  <form
                    action={updateQuoteStatus}
                    className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"
                  >
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="id" value={quote.id} />
                    <label className="sr-only" htmlFor={`status-${quote.id}`}>
                      Quote status
                    </label>
                    <select
                      id={`status-${quote.id}`}
                      name="status"
                      defaultValue={quote.status}
                      className="h-10 min-w-40 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      {Object.values(QuoteStatus).map((status) => (
                        <option key={status} value={status}>
                          {statusLabels[status]}
                        </option>
                      ))}
                    </select>
                    <Button type="submit" className="sm:w-auto">
                      Update
                    </Button>
                  </form>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                {quote.message ? (
                  <div className="rounded-lg border bg-background px-4 py-3 text-sm text-muted-foreground">
                    {quote.message}
                  </div>
                ) : null}
                <div className="grid gap-2 text-sm">
                  {quote.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 rounded-md border bg-background px-3 py-2"
                    >
                      <span>{item.productSnapshotName}</span>
                      <span className="shrink-0">
                        {item.quantity} x {item.unitPrice.toString()} TND
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
