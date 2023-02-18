import { Request, Response } from "express";
import httpStatus from "http-status";
import { Controller } from "../../shared/infrastructure/controllers/controller";
import { AppResponse } from "../../shared/infrastructure/responses/custom-response";
import { UserMongoRepository } from "../../user/infrastructure/user-mongo.repository";
import { LoginUseCase } from "../application/login.use-case";

interface RequestLogin extends Request {
  body: {
    username: string;
    password: string;
  };
}
export class AuthLoginController implements Controller {
  constructor(
  ) { }

  async run(req: RequestLogin, res: Response) {
    const { username, password } = req.body;

    const userRepository = new UserMongoRepository();
    const loginUseCase = new LoginUseCase(userRepository);

    const auth = await loginUseCase.run(username, password);

    const response = new AppResponse({
      message: 'User logged',
      data: {
        auth,
      },
      success: true,
    })

    res.status(httpStatus.OK).json(response)
  }
}