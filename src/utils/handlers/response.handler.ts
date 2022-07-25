/**
 * @description Response handler
 */

import { Response } from "express";
import { ICustomException } from "../../interfaces/exception.interfaces";

class CustomResponse {
  res: Response;
  exception?: ICustomException;

  constructor(res: Response, err?: ICustomException) {
    this.res = res;
    this.exception = err || new Error();
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
      code: statusCode || 200,
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
      code:
        this?.exception?.name === "CustomException"
          ? statusCode || this?.exception?.status || 500
          : this?.exception?.status || 500,
      message:
        this?.exception?.name === "CustomException"
          ? message || this?.exception?.message || "Something went wrong!"
          : "Server error!",
      data,
      meta,
    });
  }
}

export default CustomResponse;
