import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, beforeAll, beforeEach, vitest } from "vitest";
import { App } from './app';
import { JsonWebToken } from './shared/infrastructure/json_web_token/json-web-token';
import { generateUuid } from './shared/infrastructure/uuid/uuid';
import request from 'supertest'

let mongo: MongoMemoryServer;
declare global {
  var requestWithAuth: (request: request.Request) => request.Request
}
process.env.JWT_SECRET = "123456"

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
  const token = generateUserToken()
  return request.set('Authorization', 'Bearer ' + token)
}

const generateUserToken = () => {
  const id = generateUuid()
  const token = JsonWebToken.encrypt(id)
  return token.token
}

// global.signin = () => {
//   const id = new mongoose.Types.ObjectId().toHexString()
//   const token = JsonWebToken.encrypt(id)

//   const sessionJSON = JSON.stringify({ jwt: token })

//   const base64 = Buffer.from(sessionJSON).toString("base64")

//   return [`session=${base64}`]
// }