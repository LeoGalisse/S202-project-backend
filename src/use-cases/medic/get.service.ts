/* eslint-disable no-useless-constructor */
import { MedicRepository } from '@/repositories/medic-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Medic } from '@/utils/models/medic'

interface GetMedicUseCaseRequest {
  crm: string
}

interface GetMedicUseCaseResponse {
  medic: Medic
}

export class GetMedicUseCase {
  constructor(private medicRepository: MedicRepository) {}

  async execute({ crm }: GetMedicUseCaseRequest): Promise<GetMedicUseCaseResponse> {
    const medic = await this.medicRepository.findByCRM(crm)

    if (!medic) {
      throw new ResourceNotFoundError()
    }

    return {
      medic,
    }
  }
}
