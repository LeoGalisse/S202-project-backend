import { MongoDBUsersRepository } from '@/repositories/mongodb/mongodb-users-repository'
import { GetUserProfileUseCase } from '@/use-cases/users/get-user-profile.service'

export function makeGetUserProfileUseCase() {
  const usersRepository = new MongoDBUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
