import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export const uid = () => typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
export const formatDate = (value: string) => value ? new Intl.DateTimeFormat("it-IT", { month: "short", year: "numeric" }).format(new Date(value.length === 4 ? `${value}-01-01` : `${value}-01`)) : "";
