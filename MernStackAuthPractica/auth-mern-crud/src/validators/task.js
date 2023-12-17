import { z } from "zod";
export const storeVal = z.object({
  title: z.string({
    required_error: "Título es requerido",
  }),
  description: z.string({
    required_error: "Descripción no es un string",
  }),
  date: z.string().datetime().optional(),
});
