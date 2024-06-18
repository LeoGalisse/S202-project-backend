import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { MedicRepository } from '@/repositories/medic-repository'
import { User } from '@/utils/models/user'

interface MedicUseCaseResponse {
  medics: User[]
}

export class GetAllMedicsUseCase {
  constructor(private medicRepository: MedicRepository) {}

  async execute(): Promise<MedicUseCaseResponse> {
    const medics = await this.medicRepository.findAll()

    if (!medics) {
      throw new ResourceNotFoundError()
    }

    return {
      medics,
    }
  }
}
