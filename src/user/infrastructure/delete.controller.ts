import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../shared/infrastructure/controller/controller';
import { UserDelete } from '../application/delete.use-case';
import { UserMongoRepository } from './userMongo.repository';

interface UserDeleteRequest extends Request {
  params: {
    id: string
  }
}

export class UserDeleteController implements Controller {
  constructor() { }

  async run(req: UserDeleteRequest, res: Response) {
    const {
      id
    } = req.params;

    const userRepository = new UserMongoRepository();
    const deleteUserCase = new UserDelete(userRepository);
    await deleteUserCase.run(id);

    res.status(httpStatus.NO_CONTENT).send({
      result: "User deleted",
    });
  }
}
