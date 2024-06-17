import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetAllMedicUseCase } from '@/use-cases/factories/medic/make-get-all-medic-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllMedicUseCase = makeGetAllMedicUseCase()

    const { medics } = await getAllMedicUseCase.execute()

    return reply.status(200).send({ medics })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
