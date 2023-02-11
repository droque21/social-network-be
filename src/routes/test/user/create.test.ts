import request from 'supertest'
import { it, describe, expect } from 'vitest'
import { App } from '../../../app'

describe('Create User', () => {
  it('should have a route /user with method post', async () => {
    const response = await request(App.getApp()).post('/user')
    expect(response.status).not.toBe(404)
  })
})