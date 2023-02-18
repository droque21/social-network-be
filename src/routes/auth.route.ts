import { Router } from 'express';
import { AuthLoginController } from '../auth/infrastructure';
import { validateReqSchema } from '../shared/infrastructure/middlewares';
import { stringValidation } from '../shared/infrastructure/validators';


export const register = (router: Router) => {
  const baseRoute = '/api/auth';
  const reqSchema = [
    stringValidation('username'),
    stringValidation('password'),
  ];

  const loginController = new AuthLoginController();

  router.post(baseRoute, reqSchema, validateReqSchema, loginController.run);
};
