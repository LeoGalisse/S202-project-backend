export interface Pacient {
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface PacientWithId extends Pacient {
  id: string
}

export interface CreatePacient {
  userId: string
}

export interface PacientId {
  id: string
}
