import { MongoDBMedicRepository } from '@/repositories/mongodb/mongodb-medic-repository'
import { GetAllMedicsUseCase } from '@/use-cases/medic/get-all.service'

export function makeGetAllMedicUseCase() {
  const medicRepository = new MongoDBMedicRepository()
  const getAllMedicUseCase = new GetAllMedicsUseCase(medicRepository)

  return getAllMedicUseCase
}
