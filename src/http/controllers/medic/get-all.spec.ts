import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createMedic } from '@/utils/test/create-medic'

describe('Get all medic', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get all medics', async () => {
    const { token, medic } = await createMedic(app)

    const response = await request(app.server).get('/medic').set('Authorization', `Bearer ${token}`)

    expect(response.body.medics[0].crm).toEqual(medic.crm)
  })
})
