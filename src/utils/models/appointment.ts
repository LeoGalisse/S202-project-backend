export interface Appointment {
  medicId: string
  pacientId: string
  date: Date
  status?: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface AppointmentWithId extends Appointment {
  id: string
}

export interface CreateAppointment {
  medicId: string
  pacientId: string
  date: Date
  status?: string
  description?: string
}

export interface AppointmentId {
  id: string
}

export interface AppointmentWithName {
  medicName: string
  pacientName: string
  date: Date
  status?: string
  description?: string
  createdAt: Date
  updatedAt: Date
}
