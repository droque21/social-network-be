import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, beforeAll, beforeEach, vitest } from "vitest";
import { App } from './app';
import { JsonWebToken } from './shared/infrastructure/jsonWebToken/jsonWebToken';
import { generateUuid } from './shared/infrastructure/uuid/uuid';
import request from 'supertest'

process.env.JWT_SECRET = "123456"

let mongo: MongoMemoryServer;
declare global {
  var requestWithAuth: (request: request.Request) => request.Request
  var generateUserToken: () => string
}

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  if (mongo.state === "stopped") {
    await mongo.start();
  }
  await App.initialize()
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

global.requestWithAuth = (request: request.Request) => {
  const token = global.generateUserToken()
  return request.set('Authorization', 'Bearer ' + token)
}

global.generateUserToken = () => {
  const id = generateUuid()
  const token = new JsonWebToken().encrypt(id)
  return token.token
}