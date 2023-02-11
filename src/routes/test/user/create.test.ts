import request from 'supertest'
import { it, describe, expect } from 'vitest'
import { App } from '../../../app'

describe('Create User', () => {
  it('should have a route handler listening to /api/user for post request', async () => {
    const response = await request(App.getApp()).post('/api/user')
    expect(response.status).not.toBe(404)
  })
})