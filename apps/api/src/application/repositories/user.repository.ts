import { User } from '@/domain/entities/user.entity'
import { IRepository } from './repository'

export interface IUserRepository extends IRepository<User> {}