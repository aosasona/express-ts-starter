"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//Import Controller
const dummyController_1 = require("../controllers/dummyController");
//Import middleware
const dummyMiddleware_1 = require("../middlewares/dummyMiddleware");
router.get("/dummy", dummyMiddleware_1.dummyMiddleware, dummyController_1.dummyController);
exports.default = router;
