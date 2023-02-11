import { Express } from 'express';
import * as http from 'http';
export class Server {

  readonly httpServer: http.Server;
  readonly port: string;
  private readonly app: Express;
  constructor(app: Express, port: string) {
    this.port = port;
    this.app = app;
    this.httpServer = http.createServer(app);
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer.listen(this.port, () => {
        console.info(
          `  Backoffice Backend App is running at http://localhost:${this.port} in ${this.app.get('env')} mode`
        );
        console.info('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}