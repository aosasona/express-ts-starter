import express, { Express, Request, Response, Router } from "express";
const router: Router = express.Router();

//Import Controller
import { dummyController } from "../controllers/dummy.controller";

//Import middleware
import { dummyMiddleware } from "../middlewares/dummy.middleware";

router.get("/", dummyMiddleware, dummyController);

export default router;
