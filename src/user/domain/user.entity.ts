
export class User {
  readonly id: string;
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor({ id, username, firstName, lastName }: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  }) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}