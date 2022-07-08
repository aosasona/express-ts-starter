import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import toobusy_js from "toobusy-js";

const app: Express = express();

//APP MIDDLE-WARES
// Middleware
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(hpp());
app.disable("x-powered-by");

//APP ROUTES - IMPORT
import { default as routes } from "./routes";

// TOOBUSY
app.use((req: Request, res: Response, next: Function) => {
  if (toobusy_js()) {
    return res.status(429).send("Too busy!");
  }
  next();
});

app.use("/test", routes);

//DEFAULT RESPONSE TO TEST API
app.get("*", (req: Request, res: Response) => {
  res.status(200).send("Hello, world!");
});

export default app;
