export interface User {
  email: string
  password: string
  name: string
  socialName?: string
  rg: string
  cpf: string
  gender: string
  birthDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface UserWithId extends User {
  id: string
}

export interface CreateUser {
  email: string
  password: string
  name: string
  socialName?: string
  rg: string
  cpf: string
  gender: string
  birthDate: Date
}

export interface UserId {
  insertedId: string
}
