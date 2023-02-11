import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import { App } from './app';
import { Server } from './server';
import { AppSocketIO } from './socket';
dotenv.config()

process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
  process.exit(1);
});

function handleError(e: any) {
  console.log(e);
  process.exit(1);
}


const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined")
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be defined")
  }
  try {
    await App.initialize()
    const app = App.getApp()
    const server = new Server(app, process.env.PORT || '8080')
    AppSocketIO.startSocket(server.httpServer)
    await mongoose.connect(process.env.MONGO_URI)
    await server.listen()
  } catch (e) {
    handleError(e);
  }
}

start()