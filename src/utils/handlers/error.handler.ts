/**
 * @description Custom Error Class
 * @param {string} message
 * @param {number} statusCode
 * @param {object} meta
 */

class CustomException extends Error {
  status: number;
  date: Date;
  message: string;
  meta: Object;

  constructor(statusCode: number = 500, message: string = "", meta: any = {}) {
    super(message);
    this.name = "CustomException";
    this.status = statusCode || 500;
    this.message = message;
    this.meta = meta;
    this.stack = new Error().stack;
    this.date = new Date();
  }
}
export default CustomException;
