import { Container } from 'inversify'
import { UserRepository } from '../database/repositories/user.repository'
import types from '@/application/constants/types'
import { IUserRepository } from '@/application/repositories/user.repository'

export const bindRepositories = (container: Container) => {
  container.bind<IUserRepository>(types.USER_REPOSITORY).to(UserRepository)
}
