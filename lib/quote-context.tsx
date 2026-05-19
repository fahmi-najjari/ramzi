"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type QuoteProduct = {
  id: string;
  name: string;
  pricePerDay: number;
  unit: string;
  imageUrl?: string | null;
};

type QuoteItem = {
  product: QuoteProduct;
  quantity: number;
};

type QuoteCartContextValue = {
  items: QuoteItem[];
  itemCount: number;
  totalEstimate: number;
  addItem: (product: QuoteProduct, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearItems: () => void;
};

const QuoteCartContext = createContext<QuoteCartContextValue | null>(null);
const STORAGE_KEY = "ramzi-quote-cart";

function normalizeQuantity(quantity: number) {
  return Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;
}

function isQuoteItem(value: unknown): value is QuoteItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<QuoteItem>;
  const product = item.product as Partial<QuoteProduct> | undefined;

  return (
    !!product &&
    typeof product.id === "string" &&
    typeof product.name === "string" &&
    typeof product.pricePerDay === "number" &&
    typeof product.unit === "string" &&
    typeof item.quantity === "number"
  );
}

function storeItems(items: QuoteItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage can fail in private browsing or restricted environments.
    // The in-memory cart should still update for the current session.
  }
}

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [hasLoadedStoredItems, setHasLoadedStoredItems] = useState(false);

  useEffect(() => {
    try {
      const storedItems = window.localStorage.getItem(STORAGE_KEY);

      if (storedItems) {
        const parsed = JSON.parse(storedItems) as unknown;

        if (Array.isArray(parsed)) {
          setItems(
            parsed
              .filter(isQuoteItem)
              .map((item) => ({
                product: item.product,
                quantity: normalizeQuantity(item.quantity),
              })),
          );
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHasLoadedStoredItems(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredItems) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hasLoadedStoredItems, items]);

  const addItem = useCallback((product: QuoteProduct, quantity = 1) => {
    const safeQuantity = normalizeQuantity(quantity);

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        const nextItems = currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item,
        );

        storeItems(nextItems);
        return nextItems;
      }

      const nextItems = [...currentItems, { product, quantity: safeQuantity }];

      storeItems(nextItems);
      return nextItems;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((currentItems) => {
      if (quantity <= 0) {
        const nextItems = currentItems.filter(
          (item) => item.product.id !== productId,
        );

        storeItems(nextItems);
        return nextItems;
      }

      const nextItems = currentItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: normalizeQuantity(quantity) }
          : item,
      );

      storeItems(nextItems);
      return nextItems;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) => {
      const nextItems = currentItems.filter(
        (item) => item.product.id !== productId,
      );

      storeItems(nextItems);
      return nextItems;
    });
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage cleanup failures.
    }
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      totalEstimate: items.reduce(
        (total, item) => total + item.product.pricePerDay * item.quantity,
        0,
      ),
      addItem,
      updateQuantity,
      removeItem,
      clearItems,
    }),
    [addItem, clearItems, items, removeItem, updateQuantity],
  );

  return (
    <QuoteCartContext.Provider value={value}>
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext);

  if (!context) {
    throw new Error("useQuoteCart must be used within QuoteCartProvider");
  }

  return context;
}
