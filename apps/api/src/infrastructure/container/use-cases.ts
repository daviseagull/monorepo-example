import type { Container } from 'inversify'
import types from '@/application/constants/types'
import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case'

export const bindUseCases = (container: Container): void => {
  container
    .bind<CreateUserUseCase>(types.CREATE_USER_USE_CASE)
    .to(CreateUserUseCase)
}
