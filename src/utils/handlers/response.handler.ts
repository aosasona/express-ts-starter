/**
 * @description Response handler
 */

import { Response } from "express";

class CustomResponse {
  res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  // Send success response with status code and data
  public success(
    message: string = "",
    data: any = {},
    statusCode: number = 200
  ) {
    return this.res.status(statusCode || 200).json({
      error: false,
      data,
      message,
    });
  }

  // Send error response with status code and error message
  public error(message: string = "", data: any = {}, statusCode: number = 500) {
    return this.res.status(statusCode || 500).json({
      error: true,
      data,
      message,
    });
  }
}

export default CustomResponse;
