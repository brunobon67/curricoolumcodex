import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { demoContent, defaultSettings } from "../lib/demo-data";
const prisma=new PrismaClient();
async function main(){const user=await prisma.user.upsert({where:{email:"demo@vitae.local"},update:{},create:{name:"Utente Demo",email:"demo@vitae.local",passwordHash:await bcrypt.hash("demo12345",12)}});await prisma.resume.create({data:{userId:user.id,name:"CV Product Designer",templateId:"modern",content:demoContent,settings:defaultSettings}});console.log("Demo: demo@vitae.local / demo12345")}
main().finally(()=>prisma.$disconnect());
