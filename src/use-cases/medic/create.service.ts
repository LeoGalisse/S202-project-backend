import { MedicRepository } from '@/repositories/medic-repository'
import { MedicAlreadyExistsError } from '../errors/medic-already-exists-error'
import { MedicId } from '@/utils/models/medic'

interface CreateMedicUseCaseRequest {
  bio?: string
  crm: string
  userId: string
}

interface CreateMedicUseCaseResponse {
  medic: MedicId | null
}

export class CreateMedicUseCase {
  constructor(private medicRepository: MedicRepository) {}

  async execute({ bio, crm, userId }: CreateMedicUseCaseRequest): Promise<CreateMedicUseCaseResponse> {
    const medicWithSameCRM = await this.medicRepository.findByCRM(crm)

    if (medicWithSameCRM) {
      throw new MedicAlreadyExistsError()
    }

    const medic = await this.medicRepository.create({
      bio,
      crm,
      userId,
    })

    return {
      medic,
    }
  }
}
