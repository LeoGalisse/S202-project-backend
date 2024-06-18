import { CreatePacient, Pacient, PacientId } from '@/utils/models/pacient'
import { User } from '@/utils/models/user'

export interface PacientsRepository {
  findById(id: string): Promise<Pacient | null>
  findAll(): Promise<User[] | null>
  create(data: CreatePacient): Promise<PacientId | null>
  delete(id: string): Promise<boolean | null>
  getPacientName(id: string): Promise<string | null>
  findByUserId(id: string): Promise<Pacient | null>
}
