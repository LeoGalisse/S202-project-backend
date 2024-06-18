import {
  Appointment,
  AppointmentId,
  AppointmentWithId,
  AppointmentWithName,
  CreateAppointment,
} from '@/utils/models/appointment'
import { AppointmentRepository } from '../appointment-repository'
import { Collection, ObjectId } from 'mongodb'
import { client } from '@/lib/mongodb'
import { MedicRepository } from '../medic-repository'
import { PacientsRepository } from '../pacients-repository'

export class MongoDBAppointmentRepository implements AppointmentRepository {
  private appointmentCollection: Collection<Appointment>

  constructor(
    private medicsRepository: MedicRepository,
    private pacientsRepository: PacientsRepository,
  ) {
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

  async getAll(): Promise<AppointmentWithName[]> {
    const data = await this.appointmentCollection.find().toArray()

    const appointments = await Promise.all(
      data.map(async (appointment) => {
        const medicName = await this.medicsRepository.getMedicName(appointment.medicId)
        const pacientName = await this.pacientsRepository.getPacientName(appointment.pacientId)

        return {
          id: appointment._id.toString(),
          medicName: medicName || 'Medic not found',
          pacientName: pacientName || 'Pacient not found',
          date: appointment.date,
          status: appointment.status,
          description: appointment.description,
          createdAt: appointment.createdAt,
          updatedAt: appointment.updatedAt,
        }
      }),
    )

    return appointments
  }
}
