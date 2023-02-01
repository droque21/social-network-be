import { Router } from 'express';
import { AuthLoginController } from '../controller/auth-login.controller';
import { stringValidation } from '../shared/infrastructure/validations/strings.validation';
import { validateReqSchema } from './index';


export const register = (router: Router) => {
  const reqSchema = [
    stringValidation('username'),
    stringValidation('password'),
  ];

  const loginController = new AuthLoginController();

  router.post('/auth', reqSchema, validateReqSchema, loginController.run);
};
