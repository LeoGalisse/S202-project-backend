import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { getAll } from './get-all.controller'
import { deleteAppointment } from './delete.controller'
import { update } from './update.controller'

export async function appointmentRoutes(app: FastifyInstance) {
  app.post('/appointment', create)
  app.put('/appointment', update)
  app.get('/appointments', getAll)
  app.delete('/appointment/:id', deleteAppointment)
}
