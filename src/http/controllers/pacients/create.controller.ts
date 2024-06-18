import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreatePacientUseCase } from '@/use-cases/factories/pacient/make-create-pacient-use-case'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerPacienteBodySchema = z.object({
    userId: z.string(),
  })

  const { userId } = registerPacienteBodySchema.parse(request.body)

  try {
    const createPacientUseCase = makeCreatePacientUseCase()

    const createdPacient = await createPacientUseCase.execute({
      userId,
    })

    return reply.status(201).send({
      createdPacient,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
