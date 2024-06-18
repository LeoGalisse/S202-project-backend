import { CouldNotUpdateError } from '@/use-cases/errors/could-not-update-error'
import { makeUpdateAppointmentUseCase } from '@/use-cases/factories/appointment/make-update-appointment-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateAppointmentBodySchema = z.object({
    id: z.string(),
    pacientId: z.string().optional(),
    medicId: z.string().optional(),
    date: z.string().optional(),
  })

  const { id, pacientId, medicId, date } = updateAppointmentBodySchema.parse(request.body)

  try {
    const updateUseCase = makeUpdateAppointmentUseCase()

    await updateUseCase.execute({
      appointment: {
        id,
        pacientId,
        medicId,
        date: date ? new Date(date) : undefined,
      },
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof CouldNotUpdateError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
