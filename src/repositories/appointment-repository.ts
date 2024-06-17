import { Appointment, Prisma } from '@prisma/client'

export interface AppointmentRepository {
  create(appointment: Prisma.AppointmentCreateInput): Promise<Appointment>
  update(appointment: Appointment): Promise<void>
  findByAppointmentId(appointmentId: string): Promise<Appointment | null>
  findByPacientId(pacientId: string): Promise<Appointment[] | void>
  findByMedicId(medicId: string): Promise<Appointment[] | void>
  deleteByAppointmentId(appointmentId: string): Promise<void>
}
