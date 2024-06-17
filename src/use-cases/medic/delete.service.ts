import { MedicRepository } from '@/repositories/medic-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteMedicUseCaseRequest {
  crm: string
}

export class DeleteMedicUseCase {
  constructor(private medicRepository: MedicRepository) {}

  async execute({ crm }: DeleteMedicUseCaseRequest): Promise<void> {
    const response = await this.medicRepository.delete(crm)

    if (!response) {
      throw new ResourceNotFoundError()
    }
  }
}
