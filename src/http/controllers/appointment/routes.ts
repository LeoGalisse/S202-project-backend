import { FastifyInstance } from 'fastify'
import { create } from './create.controller'

export async function appointmentRoutes(app: FastifyInstance) {
  app.post('/appointment', create)
}
