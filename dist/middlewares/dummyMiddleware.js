"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyMiddleware = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.dummyMiddleware = (0, express_async_handler_1.default)((req, res, next) => {
    console.log("Middleware works!");
    next();
});
