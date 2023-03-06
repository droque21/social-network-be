import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, beforeAll, beforeEach, vitest } from "vitest";
import { App } from './app';
import { JsonWebToken } from './shared/infrastructure/json_web_token/json-web-token';
import { generateUuid } from './shared/infrastructure/uuid/uuid';
import request from 'supertest'
import { UserModel } from './user/infrastructure';

let mongo: MongoMemoryServer;
declare global {
  var getAuthorizationHeader: () => Promise<[string, string]>
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
  mongoose.set('strictQuery', false)
  await mongoose.connect(mongoUri, {
  })
})

beforeEach(async () => {
  vitest.clearAllMocks()
  const collections = await mongoose.connection.db.collections()
  await Promise.all(collections.map(async (collection) => collection.deleteMany({})))

  const users = await UserModel.find({})
  if (users.length === 0) {
    const id = generateUuid()
    const user = UserModel.build({
      id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@email.com',
      password: '123456',
      username: 'username',
    })
    await user.save()
  }
})

afterAll(async () => {
  if (mongo) {
    await mongo.stop()
  }
  await mongoose.connection.close()
})

global.getAuthorizationHeader = async () => {
  const user = await UserModel.findOne({})
  const id = user?.id
  const token = generateUserToken(id)
  return ['Authorization', 'Bearer ' + token]
}

const generateUserToken = (id: string) => {
  const token = JsonWebToken.encrypt(id)
  return token.token
}