import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import { Server } from './server'
export class App {
  server?: Server;

  constructor() {
    dotenv.config()
  }

  async start() {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be defined")
    }

    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB")

    const port = process.env.PORT || '5001';
    this.server = new Server(port);
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }
}