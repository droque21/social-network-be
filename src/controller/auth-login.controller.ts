import { Request, Response } from "express";
import { PasswordEncrypter } from "../shared/infrastructure/passwordEncrypter/passwordEncrypter";
import { UserMongoRepository } from "../user/infrastructure/userMongo.repository";

interface RequestLogin extends Request {
  body: {
    username: string;
    password: string;
  };
}

export class AuthLoginController {
  constructor(
  ) { }

  async run(req: RequestLogin, res: Response) {
    const { username, password } = req.body;

    const userRepository = new UserMongoRepository();
    const user = await userRepository.findUserByUsername(username);

    if (!user) {
      throw new Error('User or password incorrect');
    }

    const passwordEncrypter = new PasswordEncrypter();
    const passwordValid = await passwordEncrypter.compare(password, user.password);

    if (!passwordValid) {
      throw new Error('User or password incorrect');
    }

    return res.json({ "message": "ok" })
  }
}