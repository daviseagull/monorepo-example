import { FastifyReply, FastifyRequest } from 'fastify'
import { HttpError } from '../models/http-error'

export const authHook = async (
  request: FastifyRequest,
  _reply: FastifyReply
) => {
  let token = request.headers.authorization

  if (!token && !token?.startsWith('Bearer')) {
    throw HttpError.badRequest('Invalid Token')
  }

  token = token.replace('Bearer ', '')

  try {
    // const payload = await cognitoUtils.getVerifier().verify(token)
    // request.user = {
    //   cognitoId: payload.sub,
    //   id: payload['custom:id'] as string,
    // }
  } catch {
    throw HttpError.unauthorized('Unauthorized')
  }
}
