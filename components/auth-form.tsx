"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/lib/validation";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
type Fields = z.infer<typeof authSchema>;
export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter(); const [serverError,setServerError]=useState("");
  const { register, handleSubmit, formState:{errors,isSubmitting} }=useForm<Fields>({resolver:zodResolver(authSchema)});
  const submit=async(data:Fields)=>{setServerError(""); const res=await fetch(`/api/auth/${mode}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}); const json=await res.json(); if(!res.ok){setServerError(json.error);return;} router.push("/dashboard"); router.refresh();};
  return <form onSubmit={handleSubmit(submit)} className="space-y-4">{mode==="register"&&<Field label="Nome e cognome" error={errors.name?.message}><input {...register("name")} placeholder="Giulia Bianchi" className="input" autoComplete="name"/></Field>}<Field label="Email" error={errors.email?.message}><input {...register("email")} type="email" placeholder="nome@esempio.it" className="input" autoComplete="email"/></Field><Field label="Password" error={errors.password?.message}><input {...register("password")} type="password" placeholder="Almeno 8 caratteri" className="input" autoComplete={mode==="login"?"current-password":"new-password"}/></Field>{mode==="login"&&<div className="text-right"><Link href="/forgot-password" className="text-xs font-semibold text-sage-700">Password dimenticata?</Link></div>}{serverError&&<p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}<button disabled={isSubmitting} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink font-semibold text-white hover:bg-sage-700 disabled:opacity-60">{isSubmitting?"Attendi...":mode==="login"?"Accedi":"Crea il mio account"}<ArrowRight size={17}/></button><div className="relative py-2 text-center text-xs text-gray-400 before:absolute before:left-0 before:top-1/2 before:w-full before:border-t"><span className="relative bg-white px-3">oppure</span></div><button type="button" disabled className="h-11 w-full rounded-xl border font-semibold text-gray-500 disabled:opacity-70">Continua con Google <span className="ml-1 text-xs">(presto)</span></button></form>;
}
function Field({label,error,children}:{label:string;error?:string;children:React.ReactNode}){return <label className="block text-sm font-semibold">{label}{children}{error&&<span className="mt-1 block text-xs font-normal text-red-600">{error}</span>}</label>}
