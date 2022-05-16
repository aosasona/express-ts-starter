import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

export const dummyMiddleware = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware works!");
    next();
  }
);
