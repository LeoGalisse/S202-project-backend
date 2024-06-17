import { app } from '@/app'
import { createMedic } from '@/utils/test/create-medic'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Get medic (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a medic', async () => {
    const { medic, token } = await createMedic(app)

    const response = await request(app.server)
      .get(`/medic/${medic.crm}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
  })
})
