export class Auth {

  readonly id: string;
  readonly token: string;

  constructor(id: string, token: string) {
    this.id = id;
    this.token = token;
  }
}