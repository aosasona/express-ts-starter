"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
//PARSE ENV VARIABLES
dotenv_1.default.config();
//CONNECT TO MONGODB
(0, db_1.default)();
const app = (0, express_1.default)();
//APP MIDDLE-WARES
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//APP ROUTES - IMPORT
const dummyRoutes_1 = __importDefault(require("./routes/dummyRoutes"));
app.use("/", dummyRoutes_1.default);
//DEFAULT RESPONSE TO TEST API
app.use("/", (req, res) => {
    res.status(200).send("Hello, world!");
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
