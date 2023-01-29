import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { User } from '../user/domain/user.entity';
import { Controller } from './controller';

type UserCreateRequest = Request & {
  body: {
    id: string;
    name: string;
    duration: string;
  };
};
export class UserCreateController implements Controller {
  constructor() { }

  async run(req: UserCreateRequest, res: Response) {
    const { id, name, duration } = req.body;
    const userCreated = new User({
      id,
      firstName: name,
      lastName: duration,
      username: name,
    })

    res.status(httpStatus.CREATED).send({
      user: userCreated,
    });
  }
}
