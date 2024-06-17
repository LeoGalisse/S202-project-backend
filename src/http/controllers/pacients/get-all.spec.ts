import { app } from '@/app'
import { createPacient } from '@/utils/test/create-pacient'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Get all pacients (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get all pacients', async () => {
    const { token, pacient } = await createPacient(app)

    const response = await request(app.server).get('/pacient').set('Authorization', `Bearer ${token}`).send()

    const { pacients } = response.body

    expect(response.status).toBe(200)
    expect(pacients).toEqual([pacient])
  })
})
