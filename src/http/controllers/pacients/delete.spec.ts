import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createPacient } from '@/utils/test/create-pacient'

describe('Delete Pacient (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a pacient', async () => {
    const { pacient, token } = await createPacient(app)

    const response = await request(app.server)
      .delete(`/pacient/${pacient.userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)
  })

  it('should not be able to delete a pacient with a invalid id', async () => {
    const { token } = await createPacient(app)

    const response = await request(app.server)
      .delete(`/pacient/AAA`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.body.message).toBe('Resource not found.')
  })
})
