import { PacientsRepository } from '@/repositories/pacients-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { User } from '@/utils/models/user'

interface GetAllPacientsUseCaseResponse {
  pacients: User[]
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
