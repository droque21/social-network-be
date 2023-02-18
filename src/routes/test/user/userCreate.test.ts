import request from 'supertest'
import { expect, it } from 'vitest'
import { App } from '../../../app'
import { generateUuid } from '../../../shared/infrastructure/uuid'
import { UserModel } from '../../../user/domain'

it('should have a route handler listening to /api/user for post request', async () => {
  const response = await request(App.getApp()).post('/api/user')
  expect(response.status).not.toBe(404)
})

it('should return a 401 status code if the user is not authenticated', async () => {
  const response = await request(App.getApp()).post('/api/user').send({})
  expect(response.status).toBe(401)
})

it('should return a 400 status code if the request body is invalid', async () => {
  const response = await global.requestWithAuth(request(App.getApp()).post('/api/user')).send({})
  expect(response.body.errors).toHaveLength(6)
  expect(response.status).toBe(422)
})

it('should return a 201 status code if the request body is valid', async () => {
  const user: UserModel = {
    id: generateUuid(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'email@email.com',
    password: 'passw0Rd!',
    username: 'username',
  }
  const response = await global.requestWithAuth(request(App.getApp()).post('/api/user')).send(user)
  expect(response.status).toBe(201)
})