import { FastifyInstance } from 'fastify'
import { createAndAuthenticateUser } from './create-and-authenticate-user'
import request from 'supertest'

export async function createPacient(app: FastifyInstance) {
  const { token } = await createAndAuthenticateUser(app)

  const createPacient = await request(app.server)
    .post('/pacient')
    .set('Authorization', `Bearer ${token}`)
    .send()

  const { createdPacient } = createPacient.body

  const { pacient } = createdPacient

  return {
    pacient,
    token,
  }
}
