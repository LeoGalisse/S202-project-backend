import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { AppointmentRepository } from '@/repositories/appointment-repository'

interface DeleteAppointmentUseCaseRequest {
  appointmentId: string
}

export class DeleteAppointmentUseCase {
  constructor(private appoitmentRepository: AppointmentRepository) {}

  async execute({ appointmentId }: DeleteAppointmentUseCaseRequest) {
    try {
      await this.appoitmentRepository.deleteByAppointmentId(appointmentId)
    } catch (error) {
      throw new ResourceNotFoundError()
    }
  }
}
