import express, { Application } from "express";
import cors from "cors";
import { corsConfig, limiterConfig } from "./config";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import database from "./config/database";
import authRoute from "./routes/auth.route";
import { handleError, notFound } from "./middlewares/error.middleware";
import helmet from "helmet";

/**
 * @description Init express application
 * @returns {Application} - Express application
 */
const init = function (): Application {
  // * Init express app
  const app: Application = express();

  // * Connect to database
  database();

  // * Middlewares
  app.use(helmet());
  app.use(cors(corsConfig()));
  app.use(rateLimit(limiterConfig()));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // * Main Route
  // app.use('/api', mainRoute);

  // * Health Check Route
  // app.use('/api/health-check', healthCheckRoute);

  // * Auth Route
  app.use("/api/auth", authRoute);

  // * 404 Not Found
  app.use(notFound);

  // * Error handler
  app.use(handleError);

  // * Return express app
  return app;
};

export default init;
