import { CreateUser, User, UserId } from '@/utils/models/user'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: CreateUser): Promise<UserId | null>
}
