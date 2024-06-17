import { MongoDBMedicRepository } from '@/repositories/mongodb/mongodb-medic-repository'
import { GetMedicUseCase } from '@/use-cases/medic/get.service'

export function makeGetMedicUseCase() {
  const medicRepository = new MongoDBMedicRepository()
  const getMedicUseCase = new GetMedicUseCase(medicRepository)

  return getMedicUseCase
}
