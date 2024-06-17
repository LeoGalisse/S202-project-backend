/* eslint-disable no-useless-constructor */
import { PacientsRepository } from '@/repositories/pacients-repository'
import { Pacient } from '@prisma/client'

interface CreatePacientUseCaseRequest {
  userId: string
}

interface CreatePacientUseCaseResponse {
  pacient: Pacient
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
