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

export interface UserUpdateRequest extends Request {
  body: {
    firstName: string
    lastName: string
  };
  params: {
    id: string
  }
}