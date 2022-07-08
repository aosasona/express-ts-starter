import { Request, Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Dummy from "../models/dummy.model";
import CustomResponse from "../utils/handlers/response.handler";

export const dummyController: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    try {
      const Test: any = await Dummy.find().select(["name", "-_id"]).lean();

      return new CustomResponse(res).success("Dummy data", { Test }, 200, {
        type: "test",
      });
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  }
);
