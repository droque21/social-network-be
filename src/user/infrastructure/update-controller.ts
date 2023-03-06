import { Response } from 'express';
import httpStatus from 'http-status';
import { UserUpdate } from '../application';
import { UserUpdateRequest } from './user-request.interfaces';
import { UserMongoRepository } from './user-mongo.repository';
import { Controller } from '../../shared/infrastructure/controllers';
import { AppResponse } from '../../shared/infrastructure/responses';
export class UserUpdateController implements Controller {
  async run(req: UserUpdateRequest, res: Response) {

    const {
      firstName,
      lastName,
    } = req.body;

    const { id } = req.currentUser!;

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
