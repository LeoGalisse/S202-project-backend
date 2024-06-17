import { PacientsRepository } from '@/repositories/pacients-repository'
import { PacientId } from '@/utils/models/pacient'

interface CreatePacientUseCaseRequest {
  userId: string
}

interface CreatePacientUseCaseResponse {
  pacient: PacientId | null
}

export class CreatePacientUseCase {
  constructor(private pacientRepository: PacientsRepository) {}

  async execute({ userId }: CreatePacientUseCaseRequest): Promise<CreatePacientUseCaseResponse> {
    const pacient = await this.pacientRepository.create({
      userId,
    })

    return {
      pacient,
    }
  }
}
