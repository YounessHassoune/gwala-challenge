import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export type LoginType = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  name: z.string().min(4),
});

export type RegisterType = z.infer<typeof registerSchema>;
