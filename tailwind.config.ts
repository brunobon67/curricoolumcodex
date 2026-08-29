import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#17211b", sage: { 50: "#f3f7f4", 100: "#e3eee7", 500: "#4e8061", 600: "#3b684c", 700: "#31553f" } },
      boxShadow: { soft: "0 12px 40px rgba(23,33,27,.08)" },
      fontFamily: { sans: ["var(--font-inter)", "sans-serif"], display: ["var(--font-newsreader)", "serif"] }
    }
  },
  plugins: []
} satisfies Config;
