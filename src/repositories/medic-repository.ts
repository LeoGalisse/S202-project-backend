import { Medic, Prisma } from '@prisma/client'

export interface MedicRepository {
  findById(id: string): Promise<Medic | null>
  findByCRM(crm: string): Promise<Medic | null>
  findAll(): Promise<Medic[] | null>
  create(data: Prisma.MedicCreateInput): Promise<Medic>
  delete(id: string): Promise<Medic | null>
  update(id: string, data: Prisma.MedicUpdateInput): Promise<Medic | null>
}
