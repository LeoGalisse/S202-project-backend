import { MongoDBMedicRepository } from '@/repositories/mongodb/mongodb-medic-repository'
import { DeleteMedicUseCase } from '@/use-cases/medic/delete.service'

export function makeDeleteMedicUseCase() {
  const medicRepository = new MongoDBMedicRepository()
  const deleteMedicUseCase = new DeleteMedicUseCase(medicRepository)

  return deleteMedicUseCase
}
