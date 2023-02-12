import { Request } from "express";

export interface UserCreateRequest extends Request {
  body: {
    id: string
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
  };
}