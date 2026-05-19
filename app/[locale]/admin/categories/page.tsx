import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import type React from "react";

import { AdminShell } from "@/components/admin-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { createCategory, deleteCategory, updateCategory } from "../manage-actions";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminCategoriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!(await isAdminAuthenticated())) {
    redirect(`/${locale}/admin`);
  }

  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { products: true } } },
  });

  return (
    <AdminShell
      locale={locale}
      title="Categories"
      description="Create and organize catalogue categories. Products are assigned to these categories."
    >
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="font-serif text-2xl text-secondary">
            Add category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createCategory} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="locale" value={locale} />
            <Field name="slug" label="Slug" placeholder="decorations" required />
            <Field name="sortOrder" label="Sort order" type="number" defaultValue="0" />
            <Field name="nameFr" label="Name FR" required />
            <Field name="nameAr" label="Name AR" required />
            <TextArea name="descriptionFr" label="Description FR" />
            <TextArea name="descriptionAr" label="Description AR" />
            <label className="flex items-center gap-2 text-sm font-medium">
              <input name="active" type="checkbox" defaultChecked />
              Active
            </label>
            <button className="h-11 rounded-md bg-secondary px-4 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 md:col-span-2">
              Add category
            </button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-5">
        {categories.map((category) => (
          <Card key={category.id} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="font-serif text-xl text-secondary">
                {category.nameFr} / {category.nameAr}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {category.slug} · {category._count.products} products
              </p>
            </CardHeader>
            <CardContent>
              <form action={updateCategory} className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="id" value={category.id} />
                <Field name="slug" label="Slug" defaultValue={category.slug} required />
                <Field
                  name="sortOrder"
                  label="Sort order"
                  type="number"
                  defaultValue={String(category.sortOrder)}
                />
                <Field name="nameFr" label="Name FR" defaultValue={category.nameFr} required />
                <Field name="nameAr" label="Name AR" defaultValue={category.nameAr} required />
                <TextArea
                  name="descriptionFr"
                  label="Description FR"
                  defaultValue={category.descriptionFr ?? ""}
                />
                <TextArea
                  name="descriptionAr"
                  label="Description AR"
                  defaultValue={category.descriptionAr ?? ""}
                />
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input name="active" type="checkbox" defaultChecked={category.active} />
                  Active
                </label>
                <button className="h-10 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 md:col-span-2">
                  Save category
                </button>
              </form>
              <form action={deleteCategory} className="mt-3">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="id" value={category.id} />
                <button className="h-10 rounded-md border border-destructive/40 px-4 text-sm font-semibold text-destructive hover:bg-destructive/10">
                  Delete category
                </button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
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
