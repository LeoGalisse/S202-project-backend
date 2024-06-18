import { AppointmentRepository } from '@/repositories/appointment-repository'
import { UpdateAppointment } from '@/utils/models/appointment'

interface UpdateAppointmentUseCaseRequest {
  appointment: UpdateAppointment
}

export class UpdateAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({ appointment }: UpdateAppointmentUseCaseRequest): Promise<void> {
    await this.appointmentRepository.update(appointment)
  }
}
