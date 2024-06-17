/* eslint-disable no-useless-constructor */
import { PacientsRepository } from '@/repositories/pacients-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface DeletePacientUseCaseRequest {
  userId: string
}

export class DeletePacientUseCase {
  constructor(private pacientsRepository: PacientsRepository) {}

  async execute({ userId }: DeletePacientUseCaseRequest): Promise<void> {
    const pacient = await this.pacientsRepository.delete(userId)

    if (!pacient) {
      throw new ResourceNotFoundError()
    }
  }
}
