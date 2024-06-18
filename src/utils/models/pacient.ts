import { ObjectId } from 'mongodb'

export interface Pacient {
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface PacientWithId extends Pacient {
  _id: ObjectId
}

export interface CreatePacient {
  userId: string
}

export interface PacientId {
  id: string
}
