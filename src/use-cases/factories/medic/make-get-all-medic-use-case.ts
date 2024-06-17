import { PrismaMedicRepository } from '@/repositories/prisma/prisma-medic-repository'
import { GetAllMedicsUseCase } from '@/use-cases/medic/get-all.service'

export function makeGetAllMedicUseCase() {
  const medicRepository = new PrismaMedicRepository()
  const getAllMedicUseCase = new GetAllMedicsUseCase(medicRepository)

  return getAllMedicUseCase
}
