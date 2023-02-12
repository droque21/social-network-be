import { Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../shared/infrastructure/controller/controller';
import { AppResponse } from '../../shared/infrastructure/responses/customResponse';
import { UserUpdate } from '../application/update.use-case';
import { UserUpdateRequest } from './user.request';
export class UserUpdateController implements Controller {
  private userUpdateUseCase: UserUpdate;

  constructor(
    userUpdateUseCase: UserUpdate,
  ) {
    this.userUpdateUseCase = userUpdateUseCase;
  }

  async run(req: UserUpdateRequest, res: Response) {

    const {
      firstName,
      lastName,
    } = req.body;

    const {
      id
    } = req.params;

    const userUpdated = await this.userUpdateUseCase.run({
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
