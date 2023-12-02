import { Application } from "express";
import init from "./app";
import { PORT } from "./config";

/**
 * Bootstrap the application
 */
(async function () {
  const app: Application = init();
  app.listen(PORT, () => console.log("Server", `started on port :${PORT}`));
})();
