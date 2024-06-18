import { MongoDBPacientRepository } from '@/repositories/mongodb/mongodb-pacient-repository'
import { MongoDBUsersRepository } from '@/repositories/mongodb/mongodb-users-repository'
import { CreatePacientUseCase } from '@/use-cases/pacients/create-pacient.service'

export function makeCreatePacientUseCase() {
  const usersRepository = new MongoDBUsersRepository()
  const pacientRepository = new MongoDBPacientRepository(usersRepository)
  const useCase = new CreatePacientUseCase(pacientRepository)

  return useCase
}
