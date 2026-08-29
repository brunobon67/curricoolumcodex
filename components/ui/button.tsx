import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  return <button className={cn("inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold disabled:pointer-events-none disabled:opacity-50", variant === "primary" && "bg-ink text-white hover:bg-sage-700", variant === "secondary" && "border border-gray-200 bg-white hover:bg-gray-50", variant === "ghost" && "hover:bg-gray-100", variant === "danger" && "text-red-600 hover:bg-red-50", className)} {...props} />;
}
