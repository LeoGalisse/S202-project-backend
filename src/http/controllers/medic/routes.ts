import { verifyUserRole } from '../middleware/verify-user-role'
import { create } from './create.controller'
import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middleware/verify-jwt'
import { get } from './get.controller'
import { deleteMedic } from './delete.controller'
import { updateMedic } from './update.controller'
import { getAll } from './get-all.controller'

export async function medicRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/medic', { onRequest: [verifyUserRole('ADMIN')] }, create)
  app.get('/medic/:crm', get)
  app.get('/medic', getAll)
  app.delete('/medic/:crm', { onRequest: [verifyUserRole('ADMIN')] }, deleteMedic)
  app.put('/medic', { onRequest: [verifyUserRole('ADMIN')] }, updateMedic)
}
