import express, { Express, Request, Response, Router } from "express";
const router: Router = express.Router();

//Import Controller
import { dummyController } from "../controllers/dummy.controller";

//Import middleware
import { logger } from "../middlewares/logger.middleware";

router.get("/", dummyController);

// logger({
//     allowed: ["status", "host", "method", "protocol", "path"],
//     log: process.env.NODE_ENV !== "production",
//     // format: "[STATUS] [METHOD] [PATH] [TIME]",
//   }),

export default router;
