import { MongoDBUsersRepository } from '@/repositories/mongodb/mongodb-users-repository'
import { AuthenticateUseCase } from '@/use-cases/users/authenticate.service'

export function makeAuthenticateUseCase() {
  const usersRepository = new MongoDBUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
