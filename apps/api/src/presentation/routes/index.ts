import type { FastifyInstance } from 'fastify'
import { authHook } from '../hooks/auth.hook'
import { UserRoutes } from './users.routes'

export async function Routes(fastify: FastifyInstance): Promise<void> {
  fastify.addHook('preHandler', authHook)

  await fastify.register(UserRoutes, {
    prefix: '/v1/users',
  })
}
