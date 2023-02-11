import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../shared/infrastructure/controller/controller';
import { UserUpdate } from '../application/update.use-case';
import { User } from '../domain/user.entity';
import { UserMongoRepository } from './userMongo.repository';

interface UserUpdateRequest extends Request {
  body: {
    firstName: string
    lastName: string
  };
  params: {
    id: string
  }
}
export class UserUpdateController implements Controller {
  constructor() { }

  async run(req: UserUpdateRequest, res: Response) {

    const {
      firstName,
      lastName,
    } = req.body;

    const {
      id
    } = req.params;

    const userRepository = new UserMongoRepository();

    const user = new User({
      id,
      firstName,
      lastName,
      updatedAt: Date.now(),
    })

    const updateUserCase = new UserUpdate(userRepository);

    const userUpdated = await updateUserCase.run(user);

    res.status(httpStatus.OK).send({
      user: userUpdated,
    });
  }
}
