import { z } from "zod";
export const registerVal = z.object({
  username: z.string({
    required_error: "Usuario es requerido",
  }),
  email: z
    .string({
      required_error: "Correo es requerido",
    })
    .email({
      message: "Correo inválido",
    }),
  password: z
    .string({
      required_error: "Contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe ser de almenos 6 caracteres",
    }),
});

export const loginVal = z.object({
  email: z
    .string({
      required_error: "Correo es requerido",
    })
    .email({
      message: "Correo inválido",
    }),
  password: z
    .string({
      required_error: "Contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe ser de almenos 6 caracteres",
    }),
});
