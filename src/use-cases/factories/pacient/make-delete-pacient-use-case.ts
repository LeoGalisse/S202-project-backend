import { PrismaPacientRepository } from '@/repositories/prisma/prisma-pacient-repository'
import { DeletePacientUseCase } from '@/use-cases/pacients/delete-pacient.service'

export function makeDeletePacientUseCase() {
  const pacientRepository = new PrismaPacientRepository()
  const deletePacientUseCase = new DeletePacientUseCase(pacientRepository)

  return deletePacientUseCase
}
