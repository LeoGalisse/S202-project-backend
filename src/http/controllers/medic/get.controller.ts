import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetMedicUseCase } from '@/use-cases/factories/medic/make-get-medic-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getMedicBodySchema = z.object({
    crm: z.string().regex(/(^\d{8}-\d{1}$)/),
  })

  const { crm } = getMedicBodySchema.parse(request.params)

  try {
    const getMedicUseCase = makeGetMedicUseCase()

    const medic = await getMedicUseCase.execute({ crm })

    return reply.status(200).send({ medic })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
