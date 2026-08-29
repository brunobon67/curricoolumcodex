import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { demoContent, defaultSettings, emptyContent } from "@/lib/demo-data";
export async function POST(req: Request) {
  const user = await getSession(); if (!user) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const resume = await prisma.resume.create({ data: { userId: user.id, name: body.demo ? "CV Product Designer" : "Il mio curriculum", templateId: "modern", content: body.demo ? demoContent : emptyContent, settings: defaultSettings } });
  return NextResponse.json({ id: resume.id }, { status: 201 });
}
