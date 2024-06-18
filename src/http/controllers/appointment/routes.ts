import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { getAll } from './get-all.controller'

export async function appointmentRoutes(app: FastifyInstance) {
  app.post('/appointment', create)
  app.get('/appointments', getAll)
}
