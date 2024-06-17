import { PrismaMedicRepository } from '@/repositories/prisma/prisma-medic-repository'
import { DeleteMedicUseCase } from '@/use-cases/medic/delete.service'

export function makeDeleteMedicUseCase() {
  const medicRepository = new PrismaMedicRepository()
  const deleteMedicUseCase = new DeleteMedicUseCase(medicRepository)

  return deleteMedicUseCase
}
