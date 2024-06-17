import { MongoDBMedicRepository } from '@/repositories/mongodb/mongodb-medic-repository'
import { CreateMedicUseCase } from '@/use-cases/medic/create.service'

export function makeCreateMedicUseCase() {
  const medicRepository = new MongoDBMedicRepository()
  const createMedicUseCase = new CreateMedicUseCase(medicRepository)

  return createMedicUseCase
}
