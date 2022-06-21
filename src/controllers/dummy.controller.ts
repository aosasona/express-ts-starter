import { Request, Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Dummy from "../models/dummy.model";

export const dummyController: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    try {
      const Test: any = await Dummy.find().select(["name", "-_id"]).lean();

      return res.status(200).send(Test);
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  }
);
