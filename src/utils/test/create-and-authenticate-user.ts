import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { randomInt } from 'crypto'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const email = `johndoe${randomInt(100)}@example.com`

  await prisma.user.create({
    data: {
      name: 'John Doe',
      rg: 'MG-111.111.11',
      cpf: '123.456.789-00',
      gender: 'Feminine',
      birthdate: new Date('1990-01-01'),
      email,
      password: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
