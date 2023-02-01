import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validateReqSchema } from './index';
import { UserCreateController } from '../controller/user-create.controller';
import { idValidation } from '../shared/infrastructure/validations/id.validation';
import { emailValidation, passwordValidation, stringValidation } from '../shared/infrastructure/validations/strings.validation';


export const register = (router: Router) => {
  const reqSchema = [
    idValidation,
    stringValidation('firstName'),
    stringValidation('lastName'),
    stringValidation('username'),
    passwordValidation,
    emailValidation
  ];

  const userCreateController = new UserCreateController();

  router.post('/user', reqSchema, validateReqSchema, userCreateController.run);
};
