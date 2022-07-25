import express, { Express, Request, Response, NextFunction } from "express";
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
import { ICustomException } from "./interfaces/exception.interfaces";
import CustomResponse from "./utils/handlers/response.handler";
import CustomException from "./utils/handlers/error.handler";

// TOOBUSY
app.use((req: Request, res: Response, next: Function) => {
  if (toobusy_js()) {
    const e: ICustomException = new CustomException(
      429,
      "Server is too busy. Please try again later."
    );
    return new CustomResponse(res, e).error(e.message, {}, e.status);
  }
  next();
});

// ERROR MIDDLEWARE

app.use(
  (err: ICustomException, req: Request, res: Response, next: NextFunction) => {
    if (
      process.env.NODE_ENV !== "production" ||
      err.name !== "CustomException"
    ) {
      console.error(err);
    }
    return new CustomResponse(res, err).error(
      err.name === "CustomException" ? err.message : "Something went wrong!",
      {},
      err.name === "CustomException" ? err.status : 500,
      err.name === "CustomException" ? err.meta : {}
    );
  }
);

app.use("/test", routes);

//  404
app.get("*", (req: Request, res: Response) => {
  const e: ICustomException = new CustomException(404, "How did you get here?");
  return new CustomResponse(res, e).error(e.message, {}, 404, {
    path: req.originalUrl,
    method: req.method,
  });
});

export default app;
