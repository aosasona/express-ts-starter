import express, { Express, Request, Response, Router } from "express";
const router: Router = express.Router();

//Import Controller
import { dummyController } from "../controllers/dummyController";

//Import middleware
import { dummyMiddleware } from "../middlewares/dummyMiddleware";

router.get("/dummy", dummyMiddleware, dummyController);

export default router;
