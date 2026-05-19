import { PricingUnit } from "@/lib/generated/prisma/enums";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import type React from "react";

import { AdminShell } from "@/components/admin-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { createProduct, deleteProduct, updateProduct } from "../manage-actions";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!(await isAdminAuthenticated())) {
    redirect(`/${locale}/admin`);
  }

  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { nameFr: "asc" }],
    }),
    prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: { category: true },
    }),
  ]);

  return (
    <AdminShell
      locale={locale}
      title="Products"
      description="Add products, change prices, and update image URLs. Cloudinary can replace the URL field later."
    >
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="font-serif text-2xl text-secondary">
            Add product
          </CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Add a category first before creating products.
            </p>
          ) : (
            <ProductForm
              locale={locale}
              categories={categories}
              action={createProduct}
              submitLabel="Add product"
            />
          )}
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-5">
        {products.map((product) => (
          <Card key={product.id} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="font-serif text-xl text-secondary">
                {product.nameFr} / {product.nameAr}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {product.category.nameFr} · {product.pricePerDay.toString()} TND ·{" "}
                {product.unit}
              </p>
            </CardHeader>
            <CardContent>
              <ProductForm
                locale={locale}
                categories={categories}
                action={updateProduct}
                product={{
                  ...product,
                  pricePerDay: product.pricePerDay.toString(),
                }}
                submitLabel="Save product"
              />
              <form action={deleteProduct} className="mt-3">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="id" value={product.id} />
                <button className="h-10 rounded-md border border-destructive/40 px-4 text-sm font-semibold text-destructive hover:bg-destructive/10">
                  Delete product
                </button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}

type CategoryOption = {
  id: string;
  nameFr: string;
  nameAr: string;
};

type ProductFormValue = {
  id?: string;
  slug?: string;
  categoryId?: string;
  nameFr?: string;
  nameAr?: string;
  descriptionFr?: string;
  descriptionAr?: string;
  pricePerDay?: string;
  unit?: PricingUnit;
  imageUrl?: string | null;
  minQuantity?: number;
  availableQuantity?: number | null;
  featured?: boolean;
  active?: boolean;
  sortOrder?: number;
};

function ProductForm({
  locale,
  categories,
  product,
  action,
  submitLabel,
}: {
  locale: string;
  categories: CategoryOption[];
  product?: ProductFormValue;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      {product?.id && <input type="hidden" name="id" value={product.id} />}
      <Field name="slug" label="Slug" defaultValue={product?.slug ?? ""} required />
      <label className="grid gap-2 text-sm font-medium">
        Category
        <select
          name="categoryId"
          defaultValue={product?.categoryId ?? categories[0]?.id}
          className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nameFr} / {category.nameAr}
            </option>
          ))}
        </select>
      </label>
      <Field name="nameFr" label="Name FR" defaultValue={product?.nameFr ?? ""} required />
      <Field name="nameAr" label="Name AR" defaultValue={product?.nameAr ?? ""} required />
      <TextArea
        name="descriptionFr"
        label="Description FR"
        defaultValue={product?.descriptionFr ?? ""}
        required
      />
      <TextArea
        name="descriptionAr"
        label="Description AR"
        defaultValue={product?.descriptionAr ?? ""}
        required
      />
      <Field
        name="pricePerDay"
        label="Price"
        type="number"
        step="0.01"
        defaultValue={product?.pricePerDay ?? "0"}
        required
      />
      <label className="grid gap-2 text-sm font-medium">
        Unit
        <select
          name="unit"
          defaultValue={product?.unit ?? PricingUnit.PIECE}
          className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
        >
          {Object.values(PricingUnit).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </label>
      <Field
        name="imageUrl"
        label="Image URL"
        defaultValue={product?.imageUrl ?? ""}
        placeholder="https://..."
      />
      <Field
        name="minQuantity"
        label="Min quantity"
        type="number"
        defaultValue={String(product?.minQuantity ?? 1)}
      />
      <Field
        name="availableQuantity"
        label="Available quantity"
        type="number"
        defaultValue={product?.availableQuantity?.toString() ?? ""}
      />
      <Field
        name="sortOrder"
        label="Sort order"
        type="number"
        defaultValue={String(product?.sortOrder ?? 0)}
      />
      <label className="flex items-center gap-2 text-sm font-medium">
        <input name="featured" type="checkbox" defaultChecked={product?.featured ?? false} />
        Featured
      </label>
      <label className="flex items-center gap-2 text-sm font-medium">
        <input name="active" type="checkbox" defaultChecked={product?.active ?? true} />
        Active
      </label>
      <button className="h-11 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 md:col-span-2">
        {submitLabel}
      </button>
    </form>
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

function TextArea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <textarea
        {...props}
        className="min-h-24 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
      />
    </label>
  );
}
