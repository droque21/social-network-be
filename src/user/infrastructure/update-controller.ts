import { Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../shared/infrastructure/controller/controller';
import { AppResponse } from '../../shared/infrastructure/responses/customResponse';
import { UserUpdate } from '../application/update.use-case';
import { UserUpdateRequest } from './user.request';
import { UserMongoRepository } from './userMongo.repository';
export class UserUpdateController implements Controller {
  async run(req: UserUpdateRequest, res: Response) {

    const {
      firstName,
      lastName,
    } = req.body;

    const {
      id
    } = req.params;


    const userMongoRepository = new UserMongoRepository();

    const userUpdateUseCase = new UserUpdate(userMongoRepository);

    const userUpdated = await userUpdateUseCase.run({
      id,
      firstName,
      lastName,
    });
    const response = new AppResponse({
      message: 'User updated',
      data: {
        user: userUpdated,
      },
      success: true,
    })

    res.status(httpStatus.OK).send(response);
  }
}
