import { prisma } from '@/lib/prisma'
import { AppointmentRepository } from '../appointment-repository'
import { Appointment, Prisma } from '@prisma/client'

export class PrismaAppointmentRepository implements AppointmentRepository {
  async create(appointment: Prisma.AppointmentCreateInput): Promise<Appointment> {
    return await prisma.appointment.create({
      data: appointment,
    })
  }

  async update(appointment: Appointment): Promise<void> {
    await prisma.appointment.update({
      where: { id: appointment.id },
      data: appointment,
    })
  }

  async findByAppointmentId(appointmentId: string): Promise<null | Appointment> {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    })

    return appointment
  }

  async findByPacientId(pacientId: string): Promise<void | Appointment[]> {
    const appointments = await prisma.appointment.findMany({
      where: { pacientId },
    })
    return appointments
  }

  async findByMedicId(medicId: string): Promise<void | Appointment[]> {
    const appointments = await prisma.appointment.findMany({
      where: { medicId },
    })
    return appointments
  }

  async deleteByAppointmentId(appointmentId: string): Promise<void> {
    await prisma.appointment.delete({
      where: { id: appointmentId },
    })
  }
}
