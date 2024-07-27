import type { CreateUserDto } from '@monorepo/types'
import { inject, injectable } from 'inversify'
import types from '@/application/constants/types'
import { type UserRepository } from '@/application/repositories/user.repository'
import { logger } from '@/common/config/logger.config'
import { User } from '@/domain/entities/user.entity'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(types.USER_REPOSITORY) private repository: UserRepository
  ) {}

  execute(user: CreateUserDto): void {
    logger.info(`Creating user ${JSON.stringify(user)}`)

    void this.repository.create(User.create(user.first, user.last))
  }
}
