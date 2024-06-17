/* eslint-disable no-useless-constructor */
import { MedicRepository } from '@/repositories/medic-repository'
import { Medic, Prisma } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateMedicUseCaseRequest {
  crm: string
  data: Prisma.MedicUpdateInput
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
