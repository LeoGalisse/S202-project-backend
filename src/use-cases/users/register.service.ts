/* eslint-disable no-useless-constructor */
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  socialName?: string
  rg: string
  cpf: string
  gender: string
  birthdate: Date
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    socialName,
    rg,
    cpf,
    gender,
    birthdate,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHashed = await hash(password, 8)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      socialName,
      rg,
      cpf,
      gender,
      birthdate,
      email,
      password: passwordHashed,
    })

    return {
      user,
    }
  }
}
