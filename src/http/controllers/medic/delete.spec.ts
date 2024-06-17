import { app } from '@/app'
import { createMedic } from '@/utils/test/create-medic'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Delete medic (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a medic', async () => {
    const { medic, token } = await createMedic(app)

    const response = await request(app.server)
      .delete(`/medic/${medic.crm}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toEqual(204)
  })

  it('should not be able to delete a medic with a invalid crm', async () => {
    const { token } = await createMedic(app)

    const response = await request(app.server)
      .delete(`/medic/12345678-9`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.body.message).toBe('Resource not found.')
  })
})
