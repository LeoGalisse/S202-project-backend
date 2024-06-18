import { CreateMedic, Medic, MedicId, UpdateMedic } from '@/utils/models/medic'
import { User } from '@/utils/models/user'

export interface MedicRepository {
  findById(id: string): Promise<Medic | null>
  findByCRM(crm: string): Promise<Medic | null>
  findAll(): Promise<User[] | null>
  create(data: CreateMedic): Promise<MedicId | null>
  delete(id: string): Promise<boolean | null>
  update(id: string, data: UpdateMedic): Promise<Medic | null>
  getMedicName(id: string): Promise<string | null>
  findByUserId(id: string): Promise<Medic | null>
}
