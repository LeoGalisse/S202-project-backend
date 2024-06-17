import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetAllPacientsUseCase } from '@/use-cases/factories/pacient/make-get-all-pacient-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAll(_: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllPacientsUseCase = makeGetAllPacientsUseCase()

    const { pacients } = await getAllPacientsUseCase.execute()

    return reply.status(200).send({ pacients })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
