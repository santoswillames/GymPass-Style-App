import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
): Promise<{ token: string }> {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'jhondoe@example.com',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jhondoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
