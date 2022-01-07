import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core'
import { FastifyRequest } from 'fastify'
import { RouteGenericInterface } from 'fastify/types/route'
import { IncomingMessage, Server } from 'http'
import { MercuriusContext } from 'mercurius'
import { User } from './entities/User'

declare module 'mercurius' {
  export interface MercuriusContext {
    em: EntityManager<IDatabaseDriver<Connection>>
    user: User | null
    request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage, unknown>
  }
}
export type MainCtx = MercuriusContext
