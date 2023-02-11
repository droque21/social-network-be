import { Router, Request, Response } from 'express';
import glob from 'glob';
import { ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';

export async function registerRoutes(router: Router) {
  const routes = glob.sync('**/*.route.ts', {
    cwd: __dirname,
  });

  for (const route of routes) {
    const routePath = `${__dirname}/${route}`;
    const routeModule = await import(routePath);
    routeModule.register(router);
  }
}

export function validateReqSchema(req: Request, res: Response, next: Function) {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    return next();
  }

  const errors = validationErrors.array().map((err: ValidationError) => ({ message: err.msg, field: err.param }));

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors
  });
}
