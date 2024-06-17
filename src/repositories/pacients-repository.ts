import { Pacient, Prisma } from '@prisma/client'

export interface PacientsRepository {
  findById(id: string): Promise<Pacient | null>
  findAll(): Promise<Pacient[] | null>
  create(data: Prisma.PacientUncheckedCreateInput): Promise<Pacient>
  delete(id: string): Promise<Pacient | null>
}
