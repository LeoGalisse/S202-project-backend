import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetAllAppointmentsUseCase } from '@/use-cases/factories/appointment/make-get-all-appointments-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllAppointmentUseCase = makeGetAllAppointmentsUseCase()

    const { appointments } = await getAllAppointmentUseCase.execute()

    return reply.status(200).send({ appointments })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
