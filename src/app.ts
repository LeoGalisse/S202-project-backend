import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import { pacientsRoutes } from './http/controllers/pacients/routes'
import { medicRoutes } from './http/controllers/medic/routes'
import { appointmentRoutes } from './http/controllers/appointment/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(pacientsRoutes)
app.register(medicRoutes)
app.register(appointmentRoutes)
