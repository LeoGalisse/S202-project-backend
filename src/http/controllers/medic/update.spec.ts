import { app } from '@/app'
import { createMedic } from '@/utils/test/create-medic'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Update Medic (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a medic', async () => {
    const { medic, token } = await createMedic(app)

    const response = await request(app.server)
      .put('/medic')
      .set('Authorization', `Bearer ${token}`)
      .send({
        crm: medic.crm,
        data: {
          counselourInitial: 'SC',
        },
      })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        medic: {
          counselourInitial: 'SC',
          counselourRegistry: medic.counselourRegistry,
          crm: medic.crm,
          daysOfService: medic.daysOfService,
          id: medic.id,
          userId: medic.userId,
          bio: medic.bio,
          createdAt: expect.any(String),
          updateAt: expect.any(String),
        },
      }),
    )
  })
})
