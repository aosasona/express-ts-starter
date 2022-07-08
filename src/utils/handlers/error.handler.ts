/**
 * @description Custom Error Class
 * @param {string} message
 * @param {number} statusCode
 */

class CustomError extends Error {
  status: number;
  date: Date;
  message: string;

  constructor(message: string = "", statusCode: number = 500) {
    super(message);
    this.name = "CustomError";
    this.status = statusCode || 500;
    this.message = message;
    this.stack = new Error().stack;
    this.date = new Date();
  }
}
export default CustomError;
