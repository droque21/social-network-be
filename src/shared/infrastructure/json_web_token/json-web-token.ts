import jwt from 'jsonwebtoken';

export class JsonWebToken {

  static encrypt(id: string) {
    const expiresIn: string = '1h';
    const expiresInRefreshToken: string = '2d';
    const token = jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn });
    const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: expiresInRefreshToken });

    return {
      token,
      refreshToken,
    };
  }

  static decrypt(token: string) {
    const tokenDecrypted = jwt.verify(token, process.env.JWT_SECRET!);
    return tokenDecrypted;
  }
}