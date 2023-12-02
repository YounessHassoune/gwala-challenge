import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { resFailed } from "../helpers/response.helper";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return resFailed(res, 400, "validation failed", error);
    }
  };
