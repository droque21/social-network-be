import request from 'supertest'
import { expect, it } from 'vitest'
import { App } from '../../../app'
import { UserModel } from '../../../user/infrastructure'

it('should have a route handler listening to /api/user for put request', async () => {
  const response = await request(App.getApp()).put('/api/user')
  expect(response.status).not.toBe(404)
})

it('should return a 401 if the user is not authenticated', async () => {
  await request(App.getApp()).put('/api/user').expect(401)
})

it('should return a 422 if the request body is invalid', async () => {
  const response = await request(App.getApp()).put('/api/user').set(...(await getAuthorizationHeader())).send({})
  expect(response.status).toBe(422)
})

it('should return a 204 if the request body is valid', async () => {
  const response = await request(App.getApp()).put('/api/user').set(...(await getAuthorizationHeader())).send({ firstName: 'John', lastName: 'Doe' })
  expect(response.status).toBe(200)
})