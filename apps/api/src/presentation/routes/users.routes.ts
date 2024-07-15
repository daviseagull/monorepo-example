import {
  createReplyDtoSchema,
  CreateUserDto,
  CreateUserDtoSchema,
  StatusCodes,
} from '@monorepo/types'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Tags } from '../config/swagger/swagger-tags'
import types from '@/application/constants/types'
import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case'
import container from '@/infrastructure/container/container'
import { validationUtils } from '../../../../../packages/utils/dist'

export async function UserRoutes(fastify: FastifyInstance) {
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
        return reply.code(500).send()
      }

      useCase.execute(body)

      reply.code(200).send({
        status: StatusCodes.Created,
        message: 'User created successfully',
      })
    }
  )
}
