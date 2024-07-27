import { injectable } from 'inversify'
import { UserModel } from '../models/user.model'
import type { UserRepository } from '@/application/repositories/user.repository'
import type { User } from '@/domain/entities/user.entity'

@injectable()
export class UserRepositorySequelize implements UserRepository {
  async findAll(): Promise<User[]> {
    const users = await UserModel.findAll()
    return users.map((user) => user.dataValues)
  }

  findOneById(_id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
  doesExists(_id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  async create(entity: User): Promise<void> {
    await UserModel.create({
      firstName: entity.firstName,
      lastName: entity.lastName,
    })
  }
  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
