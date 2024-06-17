import { PrismaPacientRepository } from '@/repositories/prisma/prisma-pacient-repository'
import { CreatePacientUseCase } from '@/use-cases/pacients/create-pacient.service'

export function makeCreatePacientUseCase() {
  const pacientRepository = new PrismaPacientRepository()
  const useCase = new CreatePacientUseCase(pacientRepository)

  return useCase
}
