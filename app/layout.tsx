import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader" });
export const metadata: Metadata = { title: "Vitae — Curriculum professionali", description: "Crea un curriculum professionale in pochi minuti." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="it"><body className={`${inter.variable} ${newsreader.variable} font-sans antialiased`}><Toaster richColors position="top-center" />{children}</body></html>; }
