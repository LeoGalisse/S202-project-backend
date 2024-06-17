import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteMedicUseCase } from '@/use-cases/factories/medic/make-delete-medic-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deleteMedic(request: FastifyRequest, reply: FastifyReply) {
  const deleteMedicBodySchema = z.object({
    crm: z.string().regex(/(^\d{8}-\d{1}$)/),
  })

  const { crm } = deleteMedicBodySchema.parse(request.params)

  try {
    const deleteMedicUseCase = makeDeleteMedicUseCase()

    await deleteMedicUseCase.execute({ crm })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
