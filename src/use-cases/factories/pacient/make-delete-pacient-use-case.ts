import { MongoDBPacientRepository } from '@/repositories/mongodb/mongodb-pacient-repository'
import { DeletePacientUseCase } from '@/use-cases/pacients/delete-pacient.service'

export function makeDeletePacientUseCase() {
  const pacientRepository = new MongoDBPacientRepository()
  const deletePacientUseCase = new DeletePacientUseCase(pacientRepository)

  return deletePacientUseCase
}
