import { MongoDBAppointmentRepository } from '@/repositories/mongodb/mongodb-appointment-repository'
import { MongoDBMedicRepository } from '@/repositories/mongodb/mongodb-medic-repository'
import { MongoDBPacientRepository } from '@/repositories/mongodb/mongodb-pacient-repository'
import { MongoDBUsersRepository } from '@/repositories/mongodb/mongodb-users-repository'
import { CreateAppointmentUseCase } from '@/use-cases/appointments/create-appointment.service'

export function makeCreateAppointmentUseCase() {
  const usersRepository = new MongoDBUsersRepository()
  const pacientRepository = new MongoDBPacientRepository(usersRepository)
  const medicRepository = new MongoDBMedicRepository(usersRepository)
  const appointmentRepository = new MongoDBAppointmentRepository(medicRepository, pacientRepository)
  const createAppointmentUseCase = new CreateAppointmentUseCase(
    appointmentRepository,
    pacientRepository,
    medicRepository,
  )

  return createAppointmentUseCase
}
