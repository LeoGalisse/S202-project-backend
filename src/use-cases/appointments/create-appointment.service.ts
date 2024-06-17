import { MedicRepository } from '@/repositories/medic-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Appointment } from '@prisma/client'
import { AppointmentRepository } from '@/repositories/appointment-repository'
import { CouldNotCreateError } from '../errors/could-not-create-error'

interface CreateAppointmentUseCaseRequest {
  pacientId: string
  medicId: string
  date: string
}

interface CreateAppointmentUseCaseResponse {
  appointment: Appointment
}

export class CreateAppointmentUseCase {
  constructor(
    private appoitmentRepository: AppointmentRepository,
    private pacientRepository: UsersRepository,
    private medicRepository: MedicRepository,
  ) {}

  async execute({
    pacientId,
    medicId,
    date,
  }: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
    const pacient = await this.pacientRepository.findById(pacientId)

    if (!pacient) {
      throw new ResourceNotFoundError()
    }

    const medic = await this.medicRepository.findById(medicId)

    if (!medic) {
      throw new ResourceNotFoundError()
    }

    try {
      const appointment = await this.appoitmentRepository.create({
        medic: { connect: { id: medicId } },
        pacient: { connect: { id: pacientId } },
        date: new Date(date),
      })

      return {
        appointment,
      }
    } catch (error) {
      throw new CouldNotCreateError()
    }
  }
}
