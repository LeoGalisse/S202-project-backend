import { AppointmentRepository } from '@/repositories/appointment-repository'
import { CouldNotCreateError } from '../errors/could-not-create-error'
import { AppointmentWithName } from '@/utils/models/appointment'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetAllAppointmentsUseCaseResponse {
  appointments: AppointmentWithName[]
}

export class GetAllAppointmentsUseCase {
  constructor(private appoitmentRepository: AppointmentRepository) {}

  async execute(): Promise<GetAllAppointmentsUseCaseResponse> {
    try {
      const appointments = await this.appoitmentRepository.getAll()

      if (!appointments) {
        throw new ResourceNotFoundError()
      }

      return {
        appointments,
      }
    } catch (error) {
      throw new CouldNotCreateError()
    }
  }
}
