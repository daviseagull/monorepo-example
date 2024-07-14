import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { HttpError } from '../models/http-error'

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof HttpError) {
    reply
      .status(error.statusCode)
      .send({ statusCode: error.statusCode, message: error.message })
    return
  }

  if (error instanceof ZodError) {
    reply.status(400).send({
      statusCode: 400,
      message: 'Bad Request',
      issues: error.issues,
    })
    return
  }

  reply.send(error)
}
