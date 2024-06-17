import { MongoDBAppointmentRepository } from '@/repositories/mongodb/mongodb-appointment-repository'
import { MongoDBMedicRepository } from '@/repositories/mongodb/mongodb-medic-repository'
import { MongoDBPacientRepository } from '@/repositories/mongodb/mongodb-pacient-repository'
import { CreateAppointmentUseCase } from '@/use-cases/appointments/create-appointment.service'

export function makeCreateAppointmentUseCase() {
  const appointmentRepository = new MongoDBAppointmentRepository()
  const pacientRepository = new MongoDBPacientRepository()
  const medicRepository = new MongoDBMedicRepository()
  const createAppointmentUseCase = new CreateAppointmentUseCase(
    appointmentRepository,
    pacientRepository,
    medicRepository,
  )

  return createAppointmentUseCase
}
