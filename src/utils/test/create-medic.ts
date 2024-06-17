import { FastifyInstance } from 'fastify'
import { createAndAuthenticateUser } from './create-and-authenticate-user'
import request from 'supertest'

export async function createMedic(app: FastifyInstance) {
  const { token } = await createAndAuthenticateUser(app)

  const createdMedic = await request(app.server).post('/medic').set('Authorization', `Bearer ${token}`).send({
    bio: 'any_bio',
    crm: '00000000-0',
  })

  const { medic } = createdMedic.body

  return {
    medic: {
      ...medic,
      crm: medic.crm.toString(),
    },
    token,
  }
}
