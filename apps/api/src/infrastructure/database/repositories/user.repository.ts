import { IUserRepository } from '@/application/repositories/user.repository'
import { User } from '@/domain/entities/user.entity'
import { UserModel } from '../models/user.model'
import { injectable } from 'inversify'

@injectable()
export class UserRepository implements IUserRepository {
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
