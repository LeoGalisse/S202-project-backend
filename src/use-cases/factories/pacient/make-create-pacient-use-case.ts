import { MongoDBPacientRepository } from '@/repositories/mongodb/mongodb-pacient-repository'
import { CreatePacientUseCase } from '@/use-cases/pacients/create-pacient.service'

export function makeCreatePacientUseCase() {
  const pacientRepository = new MongoDBPacientRepository()
  const useCase = new CreatePacientUseCase(pacientRepository)

  return useCase
}
