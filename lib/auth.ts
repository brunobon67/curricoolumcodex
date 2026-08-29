import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.AUTH_SECRET || "development-only-secret-change-me");
const COOKIE = "vitae-session";
export async function createSession(user: { id: string; email: string; name: string }) {
  const token = await new SignJWT(user).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(key);
  (await cookies()).set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 604800 });
}
export async function getSession(): Promise<{ id: string; email: string; name: string } | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try { const { payload } = await jwtVerify(token, key); return payload as { id: string; email: string; name: string }; } catch { return null; }
}
export async function clearSession() { (await cookies()).delete(COOKIE); }
