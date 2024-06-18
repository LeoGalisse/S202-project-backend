import {
  Appointment,
  AppointmentId,
  AppointmentWithName,
  CreateAppointment,
  UpdateAppointment,
} from '@/utils/models/appointment'

export interface AppointmentRepository {
  create(appointment: CreateAppointment): Promise<AppointmentId | null>
  update(appointment: UpdateAppointment): Promise<void>
  findByAppointmentId(appointmentId: string): Promise<Appointment | null>
  findByPacientId(pacientId: string): Promise<Appointment[] | void>
  findByMedicId(medicId: string): Promise<Appointment[] | void>
  deleteByAppointmentId(appointmentId: string): Promise<void>
  getAll(): Promise<AppointmentWithName[] | void>
}
