import { Router } from 'express';
import { AuthLoginController } from '../auth/infrastructure/auth-login.controller';
import { stringValidation } from '../shared/infrastructure/validations/strings.validation';
import { validateReqSchema } from './index';


export const register = (router: Router) => {
  const baseRoute = '/api/auth';
  const reqSchema = [
    stringValidation('username'),
    stringValidation('password'),
  ];

  const loginController = new AuthLoginController();

  router.post(baseRoute, reqSchema, validateReqSchema, loginController.run);
};
