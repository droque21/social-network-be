import { Router } from 'express';
import { requireAuth } from '../shared/infrastructure/middlewares/require-auth';
import { UserCreateController, UserDeleteController, UserUpdateController } from '../user/infrastructure';
import { validateReqSchema } from '../shared/infrastructure/middlewares';
import { emailValidation, idValidationBody, idValidationParam, passwordValidation, stringValidation } from '../shared/infrastructure/validators';

export const register = (router: Router) => {
  const baseRoute = '/api/user';
  const updateRequestSchema = [
    stringValidation('firstName'),
    stringValidation('lastName'),
  ]

  const createRequestSchema = [
    idValidationBody,
    stringValidation('firstName'),
    stringValidation('lastName'),
    stringValidation('username'),
    passwordValidation,
    emailValidation
  ];

  const userCreateController = new UserCreateController();
  const userUpdateController = new UserUpdateController();
  const userDeleteController = new UserDeleteController();

  router.post(baseRoute, requireAuth, createRequestSchema, validateReqSchema, userCreateController.run);
  router.put(baseRoute, requireAuth, updateRequestSchema, validateReqSchema, userUpdateController.run);
  router.delete(`${baseRoute}/:id`, requireAuth, [idValidationParam], validateReqSchema, userDeleteController.run);
};
