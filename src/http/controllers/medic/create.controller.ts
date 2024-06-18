import { MedicAlreadyExistsError } from '@/use-cases/errors/medic-already-exists-error'
import { makeCreateMedicUseCase } from '@/use-cases/factories/medic/make-create-medic-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createMedicBodySchema = z.object({
    bio: z.string().optional(),
    crm: z.string().regex(/(^\d{8}-\d{1}$)/),
    userId: z.string(),
  })

  const { bio, crm, userId } = createMedicBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateMedicUseCase()

    const { medic } = await createUseCase.execute({
      bio,
      crm,
      userId,
    })

    return reply.status(201).send({ medic })
  } catch (err) {
    if (err instanceof MedicAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
