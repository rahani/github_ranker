import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import lusca from "lusca";

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
