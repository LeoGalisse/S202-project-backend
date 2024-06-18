import { MongoDBPacientRepository } from '@/repositories/mongodb/mongodb-pacient-repository'
import { MongoDBUsersRepository } from '@/repositories/mongodb/mongodb-users-repository'
import { GetAllPacientsUseCase } from '@/use-cases/pacients/get-all.service'

export function makeGetAllPacientsUseCase() {
  const usersRepository = new MongoDBUsersRepository()
  const pacientRepository = new MongoDBPacientRepository(usersRepository)
  const getAllPacientsUseCase = new GetAllPacientsUseCase(pacientRepository)

  return getAllPacientsUseCase
}
