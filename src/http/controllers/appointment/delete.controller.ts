import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteAppointmentUseCase } from '@/use-cases/factories/appointment/make-delete-appointment-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteAppointment(request: FastifyRequest, reply: FastifyReply) {
  const deleteAppointmentParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteAppointmentParamsSchema.parse(request.params)

  try {
    const deleteUseCase = makeDeleteAppointmentUseCase()

    await deleteUseCase.execute({
      appointmentId: id,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
