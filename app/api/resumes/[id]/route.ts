import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resumeUpdateSchema } from "@/lib/validation";
import type { Prisma } from "@prisma/client";
async function owned(id: string, userId: string) { return prisma.resume.findFirst({ where: { id, userId } }); }
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession(); const { id } = await params;
  if (!user || !(await owned(id, user.id))) return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  const parsed = resumeUpdateSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Dati non validi" }, { status: 400 });
  await prisma.resume.update({ where: { id }, data: { ...parsed.data, content: parsed.data.content as Prisma.InputJsonValue, settings: parsed.data.settings as Prisma.InputJsonValue } }); return NextResponse.json({ ok: true });
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession(); const { id } = await params;
  if (!user || !(await owned(id, user.id))) return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  await prisma.resume.delete({ where: { id } }); return NextResponse.json({ ok: true });
}
