import { Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../shared/infrastructure/controller/controller';
import { AppResponse } from '../../shared/infrastructure/responses/customResponse';
import { UserCreator } from '../application/create.use-case';
import { UserCreateRequest } from './user.request';
import { UserMongoRepository } from './userMongo.repository';
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
