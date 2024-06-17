import { MongoDBMedicRepository } from '@/repositories/mongodb/mongodb-medic-repository'
import { UpdateMedicUseCase } from '@/use-cases/medic/update.service'

export function makeUpdateMedicUseCase() {
  const medicRepository = new MongoDBMedicRepository()
  const updateMedicUseCase = new UpdateMedicUseCase(medicRepository)

  return updateMedicUseCase
}
