import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeletePacientUseCase } from '@/use-cases/factories/pacient/make-delete-pacient-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deletePacient(request: FastifyRequest, reply: FastifyReply) {
  const deletePacientBodySchema = z.object({
    userId: z.string(),
  })
  const { userId } = deletePacientBodySchema.parse(request.params)

  try {
    const deletePacientUseCase = makeDeletePacientUseCase()

    await deletePacientUseCase.execute({ userId })
    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
