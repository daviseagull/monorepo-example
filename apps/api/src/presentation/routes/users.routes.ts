import type { CreateUserDto } from '@monorepo/types'
import {
  createReplyDtoSchema,
  CreateUserDtoSchema,
  StatusCodes,
} from '@monorepo/types'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { validationUtils } from '@monorepo/utils'
import { Tags } from '../config/swagger/swagger-tags'
import types from '@/application/constants/types'
import type { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case'
import container from '@/infrastructure/container/container'

export function UserRoutes(fastify: FastifyInstance): void {
  fastify.post(
    '/',
    {
      schema: {
        tags: [Tags.USER],
        body: CreateUserDtoSchema,
        response: { 200: createReplyDtoSchema() },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const useCase: CreateUserUseCase = container.get(
        types.CREATE_USER_USE_CASE
      )

      const body = validationUtils.safeParse<CreateUserDto>(
        request.body,
        CreateUserDtoSchema
      )

      if (!body) {
        return reply.code(400).send()
      }

      useCase.execute(body)

      void reply.code(201).send({
        status: StatusCodes.Created,
        message: 'User created successfully',
      })
    }
  )
}
