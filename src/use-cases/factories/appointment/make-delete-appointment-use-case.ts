import { MongoDBAppointmentRepository } from '@/repositories/mongodb/mongodb-appointment-repository'
import { MongoDBMedicRepository } from '@/repositories/mongodb/mongodb-medic-repository'
import { MongoDBPacientRepository } from '@/repositories/mongodb/mongodb-pacient-repository'
import { MongoDBUsersRepository } from '@/repositories/mongodb/mongodb-users-repository'
import { DeleteAppointmentUseCase } from '@/use-cases/appointments/delete-appointment.service'

export function makeDeleteAppointmentUseCase() {
  const usersRepository = new MongoDBUsersRepository()
  const medicsRepository = new MongoDBMedicRepository(usersRepository)
  const pacientsRepository = new MongoDBPacientRepository(usersRepository)
  const appointmentRepository = new MongoDBAppointmentRepository(medicsRepository, pacientsRepository)
  const deleteUseCase = new DeleteAppointmentUseCase(appointmentRepository)

  return deleteUseCase
}
