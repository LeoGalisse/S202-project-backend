import { PrismaMedicRepository } from '@/repositories/prisma/prisma-medic-repository'
import { CreateMedicUseCase } from '@/use-cases/medic/create.service'

export function makeCreateMedicUseCase() {
  const medicRepository = new PrismaMedicRepository()
  const createMedicUseCase = new CreateMedicUseCase(medicRepository)

  return createMedicUseCase
}
