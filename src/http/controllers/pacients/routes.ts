import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { deletePacient } from './delete.controller'
import { getAll } from './get-all.controller'

export async function pacientsRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  app.post('/pacient', create)
  app.delete('/pacient/:userId', deletePacient)
  app.get('/pacients', getAll)
}
