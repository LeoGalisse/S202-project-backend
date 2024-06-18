import { MongoDBAppointmentRepository } from '@/repositories/mongodb/mongodb-appointment-repository'
import { GetAllAppointmentsUseCase } from '@/use-cases/appointments/get-all-appoitments.service'

export function makeGetAllAppointmentsUseCase() {
  const appointmentRepository = new MongoDBAppointmentRepository()
  const getAllAppointmentsUseCase = new GetAllAppointmentsUseCase(appointmentRepository)

  return getAllAppointmentsUseCase
}
