import { Router } from 'express';
import { idValidationBody, idValidationParam } from '../shared/infrastructure/validations/id.validation';
import { emailValidation, passwordValidation, stringValidation } from '../shared/infrastructure/validations/strings.validation';
import { UserCreateController } from '../user/infrastructure/create.controller';
import { UserDeleteController } from '../user/infrastructure/delete.controller';
import { UserUpdateController } from '../user/infrastructure/update-controller';
import { validateReqSchema } from './index';

export const register = (router: Router) => {

  const updateRequestSchema = [
    idValidationParam,
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

  router.post('/user', createRequestSchema, validateReqSchema, userCreateController.run);
  router.put('/user/:id', updateRequestSchema, validateReqSchema, userUpdateController.run);
  router.delete('/user/:id', [idValidationParam], validateReqSchema, userDeleteController.run);
};
