import { PrismaMedicRepository } from '@/repositories/prisma/prisma-medic-repository'
import { GetMedicUseCase } from '@/use-cases/medic/get.service'

export function makeGetMedicUseCase() {
  const medicRepository = new PrismaMedicRepository()
  const getMedicUseCase = new GetMedicUseCase(medicRepository)

  return getMedicUseCase
}
