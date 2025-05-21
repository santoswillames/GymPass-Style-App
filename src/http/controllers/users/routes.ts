import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated - Rotas que só poderam ser chamadas quando o usuário estiver autenticado. */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
