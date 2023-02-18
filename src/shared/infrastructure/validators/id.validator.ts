import { body, param } from "express-validator";
import { validateUuid } from "../uuid/uuid";

export const idValidationBody = body('id')
  .exists()
  .withMessage('id is required')
  .bail()
  .isString()
  .withMessage('id must be a string')
  .custom(validateUuid)
  .withMessage('id must be a valid uuid');

export const idValidationParam = param('id')
  .exists()
  .withMessage('id is required')
  .bail()
  .custom(validateUuid)
  .withMessage('id must be a valid uuid');
