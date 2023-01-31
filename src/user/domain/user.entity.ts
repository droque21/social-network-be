
export class User {
  readonly id: string;
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly createdAt: number;
  readonly updatedAt: number;

  constructor(user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    createdAt: number;
    updatedAt: number;
  }) {
    this.id = user.id;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;

    this.createdAt = user.createdAt || Date.now();
    this.updatedAt = user.updatedAt || Date.now();

  }
}