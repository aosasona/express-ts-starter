const router = require("express").Router();
import { default as dummyRoutes } from "./dummy.route";
import { default as scrawny } from "scrawny";

router.use(
  "/",
  scrawny({
    log: true,
  }),
  dummyRoutes
);

export default router;
