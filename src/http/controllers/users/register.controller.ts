import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/users/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    socialName: z.string().optional(),
    rg: z.string(),
    cpf: z.string(),
    gender: z.string(),
    birthdate: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, socialName, rg, cpf, gender, birthdate, email, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      socialName,
      rg,
      cpf,
      gender,
      birthdate: new Date(birthdate),
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
