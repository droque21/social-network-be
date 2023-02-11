import { it, describe, expect } from 'vitest'

describe('user', () => {
  it('should return the user', () => {
    expect({ name: 'John' }).toEqual({ name: 'John' })
  })
})