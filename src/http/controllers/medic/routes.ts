import { create } from './create.controller'
import { FastifyInstance } from 'fastify'
import { get } from './get.controller'
import { deleteMedic } from './delete.controller'
import { updateMedic } from './update.controller'
import { getAll } from './get-all.controller'

export async function medicRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  app.post('/medic', create)
  app.get('/medic/:crm', get)
  app.get('/medic', getAll)
  app.delete('/medic/:crm', deleteMedic)
  app.put('/medic', updateMedic)
}
