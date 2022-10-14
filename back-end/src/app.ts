import express, { NextFunction, Request, Response } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import lusca from "lusca";
import { topRatedValidator } from "./validators/github";
import { topRatedController } from "./controllers/github/topRated";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */
app.post("/github/topRated", topRatedValidator, topRatedController);

/**
 * 404 error handlers
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ error: "Not Found" });
});

/**
 * 500 error handlers
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // console.log("Path: ", req.path);
  // console.error("Error: ", err);

  return res.status(500).json({ error: "500 Internal Server Error" });
});

export default app;
