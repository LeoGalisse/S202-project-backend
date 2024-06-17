/* eslint-disable no-useless-constructor */
import { PacientsRepository } from '@/repositories/pacients-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Pacient } from '@/utils/models/pacient'

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
