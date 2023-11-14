import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Будь ласка, введіть правильну адресу",
  }),
  password: z
    .string()
    .min(5, { message: "Мінімум 5 символів" })
    .max(20, { message: "Максимум 20 символів" }),
});

export const registrationSchema = z
  .object({
    email: z.string().email({
      message: "Будь ласка, введіть правильну адресу",
    }),
    password: z
      .string()
      .min(5, { message: "Мінімум 5 символів" })
      .max(20, { message: "Максимум 20 символів" }),
    confirmPassword: z
      .string()
      .min(5, { message: "Мінімум 5 символів" })
      .max(20, { message: "Максимум 20 символів" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });
