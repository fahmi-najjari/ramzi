import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "mt_admin_session";
const ADMIN_SESSION_VALUE = "admin";
const SESSION_MAX_AGE = 60 * 60 * 8;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET;
}

function signSession(value: string) {
  const secret = getSessionSecret();

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }

  return createHmac("sha256", secret).update(value).digest("base64url");
}

function verifySignature(value: string, signature: string) {
  const expected = signSession(value);
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(signature);

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export function verifyAdminCredentials(username: string, password: string) {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword || !getSessionSecret()) {
    return false;
  }

  return username === adminUsername && password === adminPassword;
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  const signature = signSession(ADMIN_SESSION_VALUE);

  cookieStore.set(ADMIN_COOKIE_NAME, `${ADMIN_SESSION_VALUE}.${signature}`, {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!cookie) {
    return false;
  }

  const [value, signature] = cookie.split(".");

  if (value !== ADMIN_SESSION_VALUE || !signature || !getSessionSecret()) {
    return false;
  }

  return verifySignature(value, signature);
}
