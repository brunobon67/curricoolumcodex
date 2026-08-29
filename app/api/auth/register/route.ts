import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authSchema } from "@/lib/validation";
import { createSession } from "@/lib/auth";
export async function POST(req: Request) {
  const parsed = authSchema.safeParse(await req.json());
  if (!parsed.success || !parsed.data.name) return NextResponse.json({ error: "Controlla i dati inseriti." }, { status: 400 });
  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (exists) return NextResponse.json({ error: "Esiste già un account con questa email." }, { status: 409 });
  const user = await prisma.user.create({ data: { name: parsed.data.name, email: parsed.data.email.toLowerCase(), passwordHash: await bcrypt.hash(parsed.data.password, 12) } });
  await createSession(user); return NextResponse.json({ ok: true });
}
