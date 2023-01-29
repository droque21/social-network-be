import { Router, Request, Response } from 'express';
import glob from 'glob';
import { ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';

export function registerRoutes(router: Router) {

  const routes = glob.sync('**/*.route.ts', {
    cwd: __dirname,
  });

  routes.map(route => register(`${__dirname}/${route}`, router));
}

function register(routePath: string, router: Router) {
  const route = require(routePath);
  route.register(router);
}

export function validateReqSchema(req: Request, res: Response, next: Function) {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const errors = validationErrors.array().map((err: ValidationError) => ({ [err.param]: err.msg }));

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors
  });
}
