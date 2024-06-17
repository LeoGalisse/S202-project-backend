import { Appointment, AppointmentId, AppointmentWithId, CreateAppointment } from '@/utils/models/appointment'
import { AppointmentRepository } from '../appointment-repository'
import { Collection, ObjectId } from 'mongodb'
import { client } from '@/lib/mongodb'

export class MongoDBAppointmentRepository implements AppointmentRepository {
  private appointmentCollection: Collection<Appointment>

  constructor() {
    this.appointmentCollection = client.db().collection<Appointment>('appointments')
  }

  async create(data: CreateAppointment): Promise<AppointmentId | null> {
    const appointment = await this.appointmentCollection.insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    if (appointment.acknowledged) {
      return {
        id: appointment.insertedId.toString(),
      }
    }

    return null
  }

  async update(appointment: AppointmentWithId): Promise<void> {
    await this.appointmentCollection.updateOne({ _id: new ObjectId(appointment.id) }, { $set: appointment })
  }

  async findByAppointmentId(appointmentId: string): Promise<null | Appointment> {
    const appointment = await this.appointmentCollection.findOne({ _id: new ObjectId(appointmentId) })

    return appointment
  }

  async findByPacientId(pacientId: string): Promise<void | Appointment[]> {
    const appointments = await this.appointmentCollection.find({ pacientId }).toArray()

    return appointments
  }

  async findByMedicId(medicId: string): Promise<void | Appointment[]> {
    const appointments = await this.appointmentCollection.find({ medicId }).toArray()

    return appointments
  }

  async deleteByAppointmentId(appointmentId: string): Promise<void> {
    await this.appointmentCollection.deleteOne({ _id: new ObjectId(appointmentId) })
  }
}
