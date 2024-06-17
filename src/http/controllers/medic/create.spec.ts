import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Create Medic (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a medic', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const medic = await request(app.server).post('/medic').set('Authorization', `Bearer ${token}`).send({
      bio: 'any_bio',
      counselourInitial: 'RS',
      counselourRegistry: 123456,
      crm: '00000000-0',
    })

    expect(medic.statusCode).toEqual(201)
  })
})
