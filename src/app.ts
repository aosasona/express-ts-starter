import express, { Express, Request, Response } from "express";
import { connect, disconnect } from "./services/db";
import helmet from "helmet";
import cors from "cors";

const app: Express = express();

// Load environment variables from .env file
require("dotenv").config();

//APP MIDDLE-WARES
// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable("x-powered-by");

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

//APP ROUTES - IMPORT
import { default as routes } from "./routes";

app.use("/test", routes);

//DEFAULT RESPONSE TO TEST API
app.get("*", (req: Request, res: Response) => {
  res.status(200).send("Hello, world!");
});

export default app;
