import { CouldNotCreateError } from '@/use-cases/errors/could-not-create-error'
import { makeCreateAppointmentUseCase } from '@/use-cases/factories/appointment/make-create-appointment-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAppointmentBodySchema = z.object({
    pacientId: z.string(),
    medicId: z.string(),
    date: z.string(),
  })

  const { pacientId, medicId, date } = createAppointmentBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateAppointmentUseCase()

    const { appointment } = await createUseCase.execute({
      medicId,
      pacientId,
      date: new Date(date),
    })

    return reply.status(201).send({ appointment })
  } catch (err) {
    if (err instanceof CouldNotCreateError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
