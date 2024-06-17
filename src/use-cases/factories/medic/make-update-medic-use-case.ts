import { PrismaMedicRepository } from '@/repositories/prisma/prisma-medic-repository'
import { UpdateMedicUseCase } from '@/use-cases/medic/update.service'

export function makeUpdateMedicUseCase() {
  const medicRepository = new PrismaMedicRepository()
  const updateMedicUseCase = new UpdateMedicUseCase(medicRepository)

  return updateMedicUseCase
}
