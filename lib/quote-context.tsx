"use client";

import {
  createContext,
  useCallback,
  useContext,
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

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);

  const addItem = useCallback((product: QuoteProduct, quantity = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...currentItems, { product, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((currentItems) => {
      if (quantity <= 0) {
        return currentItems.filter((item) => item.product.id !== productId);
      }

      return currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
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
