import { z } from "zod";
export const authSchema = z.object({ email: z.email("Inserisci un'email valida"), password: z.string().min(8, "Almeno 8 caratteri"), name: z.string().min(2).max(80).optional() });
export const resumeUpdateSchema = z.object({ name: z.string().min(1).max(100), templateId: z.enum(["classic", "modern", "minimal"]), content: z.record(z.string(), z.unknown()), settings: z.record(z.string(), z.unknown()) });
