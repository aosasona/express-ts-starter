/**
 * @description Response handler
 */

import { Response } from "express";

class CustomResponse {
  res: Response;
  exception?: Error;

  constructor(res: Response, error?: Error) {
    this.res = res;
    this.exception = error || new Error();
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
      status:
        this?.exception?.name.toLowerCase() === "customerror"
          ? statusCode || 500
          : 500,
      message:
        this?.exception?.name.toLowerCase() === "customerror"
          ? message
          : "Server error!",
      data,
      meta,
    });
  }
}

export default CustomResponse;
