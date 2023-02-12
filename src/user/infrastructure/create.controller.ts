import { Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../shared/infrastructure/controller/controller';
import { AppResponse } from '../../shared/infrastructure/responses/customResponse';
import { UserCreator } from '../application/create.use-case';
import { UserCreateRequest } from './user.request';
export class UserCreateController implements Controller {
  private createUseCase: UserCreator;

  constructor(
    createUseCase: UserCreator
  ) {
    this.createUseCase = createUseCase;
  }

  async run(req: UserCreateRequest, res: Response) {
    const user = req.body;

    const userCreated = await this.createUseCase.run(user);

    const response = new AppResponse({
      message: 'User created',
      result: {
        user: userCreated,
      },
      success: true,
    })

    res.status(httpStatus.CREATED).send(response);
  }
}
