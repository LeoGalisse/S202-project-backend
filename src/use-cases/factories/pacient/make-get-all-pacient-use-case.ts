import { MongoDBPacientRepository } from '@/repositories/mongodb/mongodb-pacient-repository'
import { GetAllPacientsUseCase } from '@/use-cases/pacients/get-all.service'

export function makeGetAllPacientsUseCase() {
  const pacientRepository = new MongoDBPacientRepository()
  const getAllPacientsUseCase = new GetAllPacientsUseCase(pacientRepository)

  return getAllPacientsUseCase
}
