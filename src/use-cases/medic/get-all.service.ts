import { Medic } from '@/utils/models/medic'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { MedicRepository } from '@/repositories/medic-repository'

interface MedicUseCaseResponse {
  medics: Medic[]
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
