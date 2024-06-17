export interface Medic {
  userId: string
  crm: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

export interface MedicWithId extends Medic {
  id: string
}

export interface CreateMedic {
  userId: string
  crm: string
  bio?: string
}

export interface MedicId {
  id: string
}

export interface UpdateMedic {
  bio?: string
  crm?: string
}
