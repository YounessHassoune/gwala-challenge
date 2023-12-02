import { CorsOptions } from "cors";
import { Options } from "express-rate-limit";
import { TRUSTED_DOMAINS } from "./env";

export const corsConfig = (): CorsOptions => ({
  origin: TRUSTED_DOMAINS,
  credentials: true,
});

export const limiterConfig = (): Partial<Options> => ({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: "draft-7",
  legacyHeaders: true,
  statusCode: 429,
  message: "Too many requests, please try again later.",
});
