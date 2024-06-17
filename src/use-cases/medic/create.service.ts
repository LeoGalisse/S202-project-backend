import { MedicRepository } from '@/repositories/medic-repository'
import { Medic } from '@prisma/client'
import { MedicAlreadyExistsError } from '../errors/medic-already-exists-error'

interface CreateMedicUseCaseRequest {
  bio?: string
  crm: string
  userId: string
}

interface CreateMedicUseCaseResponse {
  medic: Medic
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
      user: { connect: { id: userId } },
    })

    return {
      medic,
    }
  }
}
