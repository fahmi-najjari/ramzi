"use server";

import { redirect } from "next/navigation";

import {
  clearAdminSession,
  createAdminSession,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

function getSafeLocale(formData: FormData) {
  const locale = formData.get("locale");

  return locale === "ar" ? "ar" : "fr";
}

export async function loginAdmin(formData: FormData) {
  const locale = getSafeLocale(formData);
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminCredentials(username, password)) {
    redirect(`/${locale}/admin?error=1`);
  }

  await createAdminSession();
  redirect(`/${locale}/admin/dashboard`);
}

export async function logoutAdmin(formData: FormData) {
  const locale = getSafeLocale(formData);

  await clearAdminSession();
  redirect(`/${locale}/admin`);
}
