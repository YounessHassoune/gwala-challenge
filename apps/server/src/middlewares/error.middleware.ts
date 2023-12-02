import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { resFailed } from "../helpers/response.helper";

// error handler
export const handleError: ErrorRequestHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return resFailed(response, status, message);
};

// 404 handler
export const notFound: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    const error: any = new Error("Path Not Found. Please go to /api");
    error.status = 404;
    next(error);
}

