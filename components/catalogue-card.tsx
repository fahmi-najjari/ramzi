"use client";

import { Check, ChevronDown, ChevronUp, Plus, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useQuoteCart } from "@/lib/quote-context";

export type CatalogueProduct = {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  unit: string;
  category: string;
  imageUrl?: string | null;
};

type CatalogueCardProps = {
  product: CatalogueProduct;
  labels: {
    add: string;
    added: string;
    per: string;
    seeMore: string;
    seeLess: string;
  };
};

export function CatalogueCard({ product, labels }: CatalogueCardProps) {
  const { addItem, items } = useQuoteCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);
  const [feedbackQuantity, setFeedbackQuantity] = useState(0);
  const cartItem = items.find((item) => item.product.id === product.id);

  function handleAddItem() {
    const nextQuantity = (cartItem?.quantity ?? 0) + 1;

    addItem({
      id: product.id,
      name: product.name,
      pricePerDay: product.pricePerDay,
      unit: product.unit,
      imageUrl: product.imageUrl,
    });
    setFeedbackQuantity(nextQuantity);
    setShowAddedFeedback(true);
  }

  useEffect(() => {
    if (!showAddedFeedback) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowAddedFeedback(false);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [showAddedFeedback]);

  return (
    <Card className="group h-full overflow-hidden rounded-2xl border-border/70 p-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {product.imageUrl ? (
          // Product image URLs may be remote/user supplied.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.28),transparent_34%),linear-gradient(135deg,hsl(var(--muted)),hsl(var(--background))_45%,hsl(var(--secondary)/0.16))]">
            <Sparkles className="h-16 w-16 text-primary/55" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent" />
        <div className="absolute end-3 top-3 max-w-[76%] rounded-xl bg-background/88 px-3 py-2 text-end shadow-sm backdrop-blur-md">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {product.category}
          </p>
          <h2 className="mt-1 font-serif text-xl font-bold leading-tight text-foreground">
            {product.name}
          </h2>
        </div>
      </div>

      <CardContent className="flex min-h-[220px] flex-1 flex-col p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-serif text-2xl font-bold text-secondary">
              {product.pricePerDay} TND
            </p>
            <p className="text-sm text-muted-foreground">
              {labels.per} {product.unit}
            </p>
          </div>
          <Button
            size="icon"
            className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
            onClick={handleAddItem}
            aria-label={labels.add}
          >
            {showAddedFeedback ? (
              <Check className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div
          aria-live="polite"
          className="mb-3 min-h-6 text-sm font-semibold text-primary"
        >
          {showAddedFeedback
            ? labels.added
            : cartItem
              ? `${cartItem.quantity} ${labels.added.toLowerCase()}`
              : ""}
        </div>

        <CardDescription
          className={
            isExpanded
              ? "leading-6"
              : "overflow-hidden leading-6 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
          }
        >
          {product.description}
        </CardDescription>

        <button
          type="button"
          className="mt-3 inline-flex w-fit items-center text-sm font-semibold text-primary transition-colors hover:text-secondary"
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? labels.seeLess : labels.seeMore}
          {isExpanded ? (
            <ChevronUp className="ms-1 h-4 w-4" />
          ) : (
            <ChevronDown className="ms-1 h-4 w-4" />
          )}
        </button>

        <CardFooter className="mt-auto p-0 pt-5">
          <Button
            className="h-11 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleAddItem}
          >
            {showAddedFeedback ? labels.added : labels.add}
          </Button>
        </CardFooter>
      </CardContent>

      {showAddedFeedback ? (
        <div className="fixed bottom-5 end-5 z-[80] w-[min( calc(100vw-2rem),22rem)] rounded-2xl border border-primary/25 bg-card p-4 text-card-foreground shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground">{labels.added}</p>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {product.name}
              </p>
              <p className="mt-2 text-sm font-semibold text-primary">
                {feedbackQuantity} {labels.added.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
