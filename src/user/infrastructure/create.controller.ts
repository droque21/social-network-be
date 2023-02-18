import { Response } from 'express';
import httpStatus from 'http-status';
import { UserCreator } from '../application';
import { UserCreateRequest } from './user-request.interfaces';
import { UserMongoRepository } from './user-mongo.repository';
import { Controller } from '../../shared/infrastructure/controllers';
import { AppResponse } from '../../shared/infrastructure/responses';
export class UserCreateController implements Controller {

  async run(req: UserCreateRequest, res: Response) {
    const user = req.body;
    const userMongoRepository = new UserMongoRepository();
    const createUserUseCase = new UserCreator(userMongoRepository);

    const userCreated = await createUserUseCase.run(user);

    const response = new AppResponse({
      message: 'User created',
      data: {
        user: userCreated,
      },
      success: true,
    })

    res.status(httpStatus.CREATED).send(response);
  }
}
