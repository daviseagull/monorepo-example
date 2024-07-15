import types from '@/application/constants/types'
import type { IUserRepository } from '@/application/repositories/user.repository'
import { logger } from '@/common/config/logger.config'
import { User } from '@/domain/entities/user.entity'
import { CreateUserDto } from '@monorepo/types'
import { inject, injectable } from 'inversify'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(types.USER_REPOSITORY) private repository: IUserRepository
  ) {}

  execute(user: CreateUserDto) {
    logger.info(`Creating user ${JSON.stringify(user)}`)

    this.repository.create(User.create(user.first, user.last))
  }
}
