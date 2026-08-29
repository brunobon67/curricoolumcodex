import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authSchema } from "@/lib/validation";
import { createSession } from "@/lib/auth";
export async function POST(req: Request) {
  const parsed = authSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Credenziali non valide." }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return NextResponse.json({ error: "Email o password non corretti." }, { status: 401 });
  await createSession(user); return NextResponse.json({ ok: true });
}
