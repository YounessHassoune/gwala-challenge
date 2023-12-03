import { z } from "zod";

const bodySchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(4),
  })
  .strict();

const loginSchema = z.object({
  body: bodySchema,
});


type loginInput = z.infer<typeof bodySchema>;

export { loginSchema, loginInput };
