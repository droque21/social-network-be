import * as bcrypt from 'bcrypt';

export class PasswordEncrypter {
  private readonly saltRounds: number = 10;

  constructor() { }

  public async encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  public async compare(password: string, encryptedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }
}