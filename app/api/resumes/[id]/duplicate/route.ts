import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession(); const { id } = await params;
  const source = user && await prisma.resume.findFirst({ where: { id, userId: user.id } });
  if (!user || !source) return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  const copy = await prisma.resume.create({ data: { userId: user.id, name: `${source.name} — copia`, templateId: source.templateId, content: source.content!, settings: source.settings! } });
  return NextResponse.json({ id: copy.id });
}
