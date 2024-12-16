import { z } from "zod";

// Register schema
export const RegisterSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "Ism kamida 3ta harifdan iborat bo'lishi kerak",
    })
    .max(20, {
      message: "Ism 20ta harifdan kichik bo'lishi kerak",
    }),

  last_name: z
    .string()
    .min(2, {
      message: "Familya kamida 3ta harifdan iborat bo'lishi kerak",
    })
    .max(20, {
      message: "Familya 20ta harifdan kichik bo'lishi kerak",
    }),
  phone: z.string().min(12, {
    message: "Telefon raqam kamida 9 ta belgi bo'lishi kerak",
  }),
  password: z.string().min(8, {
    message: "Parol kamida 6 ta belgi bo'lishi kerak",
  }),
});
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

// Validation schema using Zod
export const ProfileUpdateSchema = z.object({
  first_name: z
    .string()
    .min(2, "Ism kamida 2 ta harfdan iborat bo'lishi kerak."),
  last_name: z
    .string()
    .min(2, "Familya kamida 2 ta harfdan iborat bo'lishi kerak."),

  language: z.string().optional(),
});

export type ProfileUpdateSchemaType = z.infer<typeof ProfileUpdateSchema>;
