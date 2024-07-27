import type { Container } from 'inversify'
import { UserRepositorySequelize } from '../database/repositories/user.repository'
import types from '@/application/constants/types'

export const bindRepositories = (container: Container): void => {
  container
    .bind<UserRepositorySequelize>(types.USER_REPOSITORY)
    .to(UserRepositorySequelize)
}
