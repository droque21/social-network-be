import { body } from "express-validator";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@$!%*.?&]{8,}$/;

export const stringValidation = (key: string) => body(`${key}`)
  .exists()
  .withMessage(`${key} is required`)
  .bail()
  .notEmpty()
  .withMessage(`${key} cannot be empty`)
  .isString()
  .withMessage(`${key} must be a string`)
  .trim()

export const passwordValidation = stringValidation('password')
  .custom((value) => passwordRegex.test(value))
  .withMessage('password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character');

export const emailValidation = stringValidation('email')
  .isEmail()
  .withMessage('email must be a valid email');