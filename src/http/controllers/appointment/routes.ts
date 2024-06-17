import { FastifyInstance } from 'fastify'
import { create } from './create.controller'

export async function medicRoutes(app: FastifyInstance) {
  app.post('/appointment', create)
}
