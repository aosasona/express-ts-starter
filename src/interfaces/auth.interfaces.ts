import { User } from "@prisma/client";
import { Request } from "express";

export interface ISignUpData {
  email: string;
  username: string;
  country: string;
  password: string;
  confirmPassword: string;
}

export interface IPasswordResetData {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export interface IMiddlewareRequest extends Request {
  user: User;
}
