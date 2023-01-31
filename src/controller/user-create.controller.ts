import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserCreator } from '../user/application/create-user';
import { User } from '../user/domain/user.entity';
import { UserMongoRepository } from '../user/infrastructure/userMongo.repository';
import { Controller } from './controller';

interface UserCreateRequest extends Request {
  body: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
}
export class UserCreateController implements Controller {
  constructor() { }

  async run(req: UserCreateRequest, res: Response) {
    const { id, firstName, lastName, username } = req.body;

    const user = new User({
      id,
      firstName,
      lastName,
      username,
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
