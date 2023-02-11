import https from 'http'
import { Server } from 'socket.io'

export class AppSocketIO {
  private static io: Server;

  private constructor(httpServer: https.Server) {
    AppSocketIO.io = new Server(httpServer, {
      cors: {
        origin: '*',
      },
    });

    AppSocketIO.io.on('connection', (socket) => {
      socket.on('ping', () => {
        socket.emit('pong');
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  public static startSocket(httpServer: https.Server) {
    new AppSocketIO(httpServer);
  }

  public static getSocket() {
    return AppSocketIO.io;
  }
}