const router = require("express").Router();
import { default as dummyRoutes } from "./dummy.route";

router.use("/", dummyRoutes);

export default router;
