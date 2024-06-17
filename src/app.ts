import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import { pacientsRoutes } from './http/controllers/pacients/routes'
import { medicalrecordRoutes } from './http/controllers/medical-record/routes'
import { terapeuticRoutes } from './http/controllers/terapeutic-plan/routes'
import { medicRoutes } from './http/controllers/medic/routes'
import { employeeRoutes } from './http/controllers/employee/routes'
import { serviceRoutes } from './http/controllers/services/route'
import { prodceduresRoutes } from './http/controllers/procedures/routes'
import { connectTablesRoutes } from './http/controllers/connect-tables/routes'

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
app.register(medicalrecordRoutes)
app.register(terapeuticRoutes)
app.register(medicRoutes)
app.register(employeeRoutes)
app.register(serviceRoutes)
app.register(prodceduresRoutes)
app.register(connectTablesRoutes)
