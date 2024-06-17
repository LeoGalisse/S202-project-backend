import { MongoDBUsersRepository } from '@/repositories/mongodb/mongodb-users-repository'
import { RegisterUseCase } from '@/use-cases/users/register.service'

export function makeRegisterUseCase() {
  const usersRepository = new MongoDBUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
