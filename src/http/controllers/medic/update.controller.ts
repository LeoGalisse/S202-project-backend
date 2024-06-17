import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateMedicUseCase } from '@/use-cases/factories/medic/make-update-medic-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateMedic(request: FastifyRequest, reply: FastifyReply) {
  const updateMedicBodySchema = z.object({
    crm: z.string(),
    data: z.object({
      bio: z.string().optional(),
      crm: z
        .string()
        .regex(/(^\d{8}-\d{1}$)/)
        .optional(),
    }),
  })

  const { crm, data } = updateMedicBodySchema.parse(request.body)

  try {
    const updateMedicUseCase = makeUpdateMedicUseCase()

    const { medic } = await updateMedicUseCase.execute({
      crm,
      data,
    })

    return reply.status(200).send({ medic })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
