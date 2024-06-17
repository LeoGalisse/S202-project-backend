import { MedicRepository } from '@/repositories/medic-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Medic, UpdateMedic } from '@/utils/models/medic'

interface UpdateMedicUseCaseRequest {
  crm: string
  data: UpdateMedic
}

interface UpdateMedicUseCaseResponse {
  medic: Medic
}

export class UpdateMedicUseCase {
  constructor(private medicRepository: MedicRepository) {}

  async execute({ crm, data }: UpdateMedicUseCaseRequest): Promise<UpdateMedicUseCaseResponse> {
    const medic = await this.medicRepository.update(crm, data)

    if (!medic) {
      throw new ResourceNotFoundError()
    }

    return {
      medic,
    }
  }
}
