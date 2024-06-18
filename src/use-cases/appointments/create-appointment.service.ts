import { MedicRepository } from '@/repositories/medic-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { AppointmentRepository } from '@/repositories/appointment-repository'
import { CouldNotCreateError } from '../errors/could-not-create-error'
import { PacientsRepository } from '@/repositories/pacients-repository'
import { AppointmentId } from '@/utils/models/appointment'

interface CreateAppointmentUseCaseRequest {
  pacientId: string
  medicId: string
  date: Date
}

interface CreateAppointmentUseCaseResponse {
  appointment: AppointmentId | null
}

export class CreateAppointmentUseCase {
  constructor(
    private appoitmentRepository: AppointmentRepository,
    private pacientRepository: PacientsRepository,
    private medicRepository: MedicRepository,
  ) {}

  async execute({
    pacientId,
    medicId,
    date,
  }: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
    const pacient = await this.pacientRepository.findByUserId(pacientId)

    if (!pacient) {
      throw new ResourceNotFoundError()
    }

    const medic = await this.medicRepository.findByUserId(medicId)

    if (!medic) {
      throw new ResourceNotFoundError()
    }

    try {
      const appointment = await this.appoitmentRepository.create({
        medicId,
        pacientId,
        date,
      })

      return {
        appointment,
      }
    } catch (error) {
      throw new CouldNotCreateError()
    }
  }
}
