import jwt from 'jsonwebtoken';

export class JsonWebToken {

  encrypt(id: string) {
    const expiresIn: string = '1h';
    const expiresInRefreshToken: string = '2d';
    const token = jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn });
    const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: expiresInRefreshToken });

    return {
      token,
      refreshToken,
    };
  }

  decrypt(token: string) {
    const tokenDecrypted = jwt.verify(token, process.env.JWT_SECRET!);
    return tokenDecrypted;
  }
}