
export class User {
  readonly id?: string;
  readonly username?: string;
  readonly password?: string;
  readonly email?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly createdAt?: number;
  readonly updatedAt: number;

  constructor(user: {
    id: string;
    username?: string;
    password?: string;
    email?: string;
    firstName: string;
    lastName: string;
    createdAt?: number;
    updatedAt: number;
  }) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}