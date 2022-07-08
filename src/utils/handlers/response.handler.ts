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
    statusCode: number = 200,
    meta: any = {}
  ) {
    return this.res.status(statusCode || 200).json({
      success: true,
      status: statusCode || 200,
      message,
      data,
      meta,
    });
  }

  // Send error response with status code and error message
  public error(
    message: string = "",
    data: any = {},
    statusCode: number = 500,
    meta: any = {}
  ) {
    return this.res.status(statusCode || 500).json({
      success: false,
      status: statusCode || 500,
      message,
      data,
      meta,
    });
  }
}

export default CustomResponse;
