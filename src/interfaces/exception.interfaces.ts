export interface ICustomException extends Error {
  status?: number;
  meta?: Object;
}
