import { PrismaPacientRepository } from '@/repositories/prisma/prisma-pacient-repository'
import { GetAllPacientsUseCase } from '@/use-cases/pacients/get-all.service'

export function makeGetAllPacientsUseCase() {
  const pacientRepository = new PrismaPacientRepository()
  const getAllPacientsUseCase = new GetAllPacientsUseCase(pacientRepository)

  return getAllPacientsUseCase
}
