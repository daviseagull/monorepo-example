import types from '@/application/constants/types'
import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case'
import { Container } from 'inversify'

export const bindUseCases = (container: Container) => {
  container
    .bind<CreateUserUseCase>(types.CREATE_USER_USE_CASE)
    .to(CreateUserUseCase)
}
