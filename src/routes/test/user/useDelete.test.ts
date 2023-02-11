import request from 'supertest'
import { it, describe, expect } from 'vitest'
import { App } from '../../../app'
import { generateUuid } from '../../../shared/infrastructure/uuid/uuid'

describe('Delete User', () => {

  it('should have a route handler listening to /api/user/:id for delete request', async () => {
    const response = await request(App.getApp()).delete('/api/user/:id')
    console.log(response.body, response.status)
    expect(response.status).not.toBe(404)
  })

  it('should return a 422 status code if the id is invalid', async () => {
    const response = await request(App.getApp()).delete('/api/user/123')
    expect(response.status).toBe(422)
  })

  it('should return a 204 status code if the id is valid', async () => {
    const response = await request(App.getApp()).delete(`/api/user/${generateUuid()}`)
    expect(response.status).toBe(204)
  })
})