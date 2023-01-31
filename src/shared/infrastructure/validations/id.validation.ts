import { body } from "express-validator";
import { validateUuid } from "../uuid/uuid";

export const idValidation = body('id')
  .exists()
  .withMessage('id is required')
  .bail()
  .isString()
  .withMessage('id must be a string')
  .custom(validateUuid)
  .withMessage('id must be a valid uuid');