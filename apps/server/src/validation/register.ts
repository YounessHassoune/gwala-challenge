import { z } from "zod";

const bodySchema = z
  .object({
    name: z.string({
      required_error: "name is required",
    }),
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

const registerSchema = z.object({
  body: bodySchema,
});


type registerInput = z.infer<typeof bodySchema>;

export { registerSchema, registerInput };
