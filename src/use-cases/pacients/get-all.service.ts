/* eslint-disable no-useless-constructor */
import { PacientsRepository } from '@/repositories/pacients-repository'
import { Pacient } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetAllPacientsUseCaseResponse {
  pacients: Pacient[]
}

export class GetAllPacientsUseCase {
  constructor(private pacientsRepository: PacientsRepository) {}

  async execute(): Promise<GetAllPacientsUseCaseResponse> {
    const pacients = await this.pacientsRepository.findAll()

    if (!pacients) {
      throw new ResourceNotFoundError()
    }

    return {
      pacients,
    }
  }
}
