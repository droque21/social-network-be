import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validateReqSchema } from './index';
import { UserCreateController } from '../controller/user-create.controller';
import { idValidation } from '../shared/infrastructure/validations/id.validation';

export const register = (router: Router) => {
  const reqSchema = [
    idValidation,
    body('firstName').exists()
      .withMessage('firstName is required')
      .bail()
      .isString()
      .withMessage('firstName must be a string'),
    body('lastName')
      .exists()
      .withMessage('lastName is required')
      .bail()
      .isString()
      .withMessage('lastName must be a string'),
    body('username')
      .exists()
      .withMessage('username is required')
      .bail()
      .isString()
      .withMessage('username must be a string'),
  ];

  const userCreateController = new UserCreateController();
  router.put('/courses/:id', reqSchema, validateReqSchema, (req: Request, res: Response) =>
    userCreateController.run(req, res)
  );
};
