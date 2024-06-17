import { PrismaAppointmentRepository } from '@/repositories/prisma/prisma-appointment-repository'
import { PrismaMedicRepository } from '@/repositories/prisma/prisma-medic-repository'
import { PrismaPacientRepository } from '@/repositories/prisma/prisma-pacient-repository'
import { CreateAppointmentUseCase } from '@/use-cases/appointments/create-appointment.service'

export function makeCreateAppointmentUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository()
  const pacientRepository = new PrismaPacientRepository()
  const medicRepository = new PrismaMedicRepository()
  const createAppointmentUseCase = new CreateAppointmentUseCase(
    appointmentRepository,
    pacientRepository,
    medicRepository,
  )

  return createAppointmentUseCase
}
