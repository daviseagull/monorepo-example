import cors from '@fastify/cors'
import formbody from '@fastify/formbody'
import { fastifyHelmet } from '@fastify/helmet'
import multipart from '@fastify/multipart'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import Fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { logger } from '../common/config/logger.config'
import { swaggerConfig } from './config/swagger/swagger.config'
import { UserRoutes } from './routes/users.routes'
import { errorHandler } from './handlers/error.handler'
import { parsedEnv } from '../common/config/env.config'
import db from '@/infrastructure/database/sequelize.config'

declare module 'fastify' {
  export interface FastifyRequest {
    user: {
      cognitoId: string
      id: string
    }
  }
}

const fastify = Fastify({ logger })

// integration with zod
fastify
  .withTypeProvider<ZodTypeProvider>()
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)

// http config
fastify
  .register(fastifyHelmet)
  .register(cors)
  .register(multipart)
  .register(formbody)

// swagger config
fastify
  .register(swagger, {
    ...swaggerConfig,
    transform: jsonSchemaTransform,
  })
  .register(swaggerUi, {
    routePrefix: '/docs',
  })

fastify.register(UserRoutes, {
  prefix: '/v1/users',
})

fastify.setErrorHandler(errorHandler)

db.authenticate()
  .then(() => {
    db.sync({ force: true })
    logger.info('Connection with DB established successfully')
  })
  .catch((err) => logger.error('Unable to connect to the database:', err))

const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close()
    process.exit(0)
  })
})

fastify.listen(
  { host: parsedEnv.HOST, port: parsedEnv.PORT },
  function (err, _address) {
    if (err) {
      fastify.log.fatal(err)
      process.exit(1)
    }
  }
)
