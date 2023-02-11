import { UserModel } from "./user.interfaces";

export class User implements UserModel {
  readonly id: string;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor(user: {
    id: string;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
  }) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}