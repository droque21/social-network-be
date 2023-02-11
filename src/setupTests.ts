import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, beforeAll, beforeEach, vitest } from "vitest";
import { App } from './app';

process.env.JWT_SECRET = "123456"

let mongo: MongoMemoryServer;

declare global {
}

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  if (mongo.state === "stopped") {
    await mongo.start();
  }
  App.initialize()
  const mongoUri = mongo.getUri()
  process.env.MONGO_URI = mongoUri
  await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
  vitest.clearAllMocks()
  const collections = await mongoose.connection.db.collections()
  await Promise.all(collections.map(async (collection) => collection.deleteMany({})))
})

afterAll(async () => {
  if (mongo) {
    await mongo.stop()
  }
  await mongoose.connection.close()
})