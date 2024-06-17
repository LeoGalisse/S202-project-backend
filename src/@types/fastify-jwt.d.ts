import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      medicId: string
      pacientId: string
      role: 'ADMIN' | 'USUARIO'
      sub: string
    }
  }
}
