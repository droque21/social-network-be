import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from 'errorhandler';
import express, { Express, Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import httpStatus from 'http-status';
import { registerRoutes } from './routes';

export class App {
  private static app: Express;

  static async initialize() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: 'deny' }));
    const router = Router();
    router.use(cors());
    router.use(errorHandler());
    this.app.use(router);
    await registerRoutes(router);

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: err.message,
      });
    });
  }

  static getApp() {
    return this.app;
  }
}
