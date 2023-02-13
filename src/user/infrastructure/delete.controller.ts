import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../shared/infrastructure/controller/controller';
import { AppResponse } from '../../shared/infrastructure/responses/customResponse';
import { UserDelete } from '../application/delete.use-case';
import { UserMongoRepository } from './userMongo.repository';

interface UserDeleteRequest extends Request {
  params: {
    id: string
  }
}

export class UserDeleteController implements Controller {
  async run(req: UserDeleteRequest, res: Response) {
    const {
      id
    } = req.params;

    const userMongoRepository = new UserMongoRepository();

    const userDeleteUseCase = new UserDelete(userMongoRepository);

    await userDeleteUseCase.run(id);

    const response = new AppResponse({
      message: 'User deleted',
      data: null,
      success: true,
    })

    res.status(httpStatus.NO_CONTENT).send(response);
  }
}
