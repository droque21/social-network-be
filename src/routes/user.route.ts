import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validateReqSchema } from './index';
import { UserCreateController } from '../controller/user-create.controller';

export const register = (router: Router) => {
  const reqSchema = [
    body('id').exists().isString(),
    body('name').exists().isString(),
    body('duration').exists().isString()
  ];

  const userCreateController = new UserCreateController();
  router.put('/courses/:id', reqSchema, validateReqSchema, (req: Request, res: Response) =>
    userCreateController.run(req, res)
  );
};
