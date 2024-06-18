import { MongoDBMedicRepository } from '@/repositories/mongodb/mongodb-medic-repository'
import { MongoDBUsersRepository } from '@/repositories/mongodb/mongodb-users-repository'
import { GetAllMedicsUseCase } from '@/use-cases/medic/get-all.service'

export function makeGetAllMedicUseCase() {
  const usersRepository = new MongoDBUsersRepository()
  const medicRepository = new MongoDBMedicRepository(usersRepository)
  const getAllMedicUseCase = new GetAllMedicsUseCase(medicRepository)

  return getAllMedicUseCase
}
