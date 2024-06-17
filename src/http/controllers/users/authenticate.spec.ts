import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await prisma.branch.create({
      data: {
        name: 'Porto Alegre',
      },
    })

    await request(app.server).post('/users').send({
      name: 'John Doe',
      rg: 'MG-111.111.11',
      cpf: '123.456.789-00',
      gender: 'Feminine',
      birthdate: '1990-01-01',
      cep: '00000-000',
      street: 'Rua teste',
      number: '123',
      neighbourhood: 'Bairro teste',
      city: 'Cidade teste',
      uf: 'UF teste',
      residentCountry: 'País de residência teste',
      nacionality: 'Nacionalidade teste',
      originCountry: 'País de origem teste',
      birthCity: 'Cidade de nascimento teste',
      birthState: 'Estado de nascimento teste',
      email: 'johndoe@example.com',
      password: '123456',
      branch: 'Porto Alegre',
      cellphone: '+55999999999',
      role: Role.MEMBER,
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
