import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PasswordEncrypter } from '../shared/infrastructure/passwordEncrypter/passwordEncrypter';
import { UserCreator } from '../user/application/create-use.use-case';
import { User } from '../user/domain/user.entity';
import { UserMongoRepository } from '../user/infrastructure/userMongo.repository';
import { Controller } from './controller';

interface UserCreateRequest extends Request {
  body: {
    id: string
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
  };
}
export class UserCreateController implements Controller {
  constructor() { }

  async run(req: UserCreateRequest, res: Response) {
    const {
      id,
      firstName,
      lastName,
      email,
      username,
      password,
    } = req.body;

    const passwordEncrypter = new PasswordEncrypter();
    const passwordEncrypted = await passwordEncrypter.encrypt(password);

    const user = new User({
      id,
      firstName,
      lastName,
      email,
      username,
      password: passwordEncrypted,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })

    const userRepository = new UserMongoRepository();
    const createUserCase = new UserCreator(userRepository);

    const userCreated = await createUserCase.run(user);

    res.status(httpStatus.CREATED).send({
      user: userCreated,
    });
  }
}
