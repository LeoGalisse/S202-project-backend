import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register.service'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    it('should to register', async () => {
      const { user } = await sut.execute({
        name: 'John Doe',
        rg: 'MG-111.111.11',
        cpf: '123.456.789-00',
        gender: 'male',
        birthdate: new Date('1990-01-01'),
        email: 'johndoe@example.com',
        password: '123456',
      })

      expect(user?.insertedId).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
      await sut.execute({
        name: 'John Doe',
        rg: 'MG-111.111.11',
        cpf: '123.456.789-00',
        gender: 'male',
        birthdate: new Date('1990-01-01'),
        email: 'johndoe@example.com',
        password: '123456',
      })

      const user = await usersRepository.findByEmail('johndoe@example.com')

      if (!user) {
        throw new Error('User not found')
      }

      const isPasswordCorrectlyHashed = await compare('123456', user.password)

      expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
      await sut.execute({
        name: 'John Doe',
        rg: 'MG-111.111.11',
        cpf: '123.456.789-00',
        gender: 'male',
        birthdate: new Date('1990-01-01'),
        email: 'johndoe@example.com',
        password: '123456',
      })

      await expect(() =>
        sut.execute({
          name: 'John Doe',
          rg: 'MG-111.111.11',
          cpf: '123.456.789-00',
          gender: 'male',
          birthdate: new Date('1990-01-01'),
          email: 'johndoe@example.com',
          password: '123456',
        }),
      ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
  })
})
