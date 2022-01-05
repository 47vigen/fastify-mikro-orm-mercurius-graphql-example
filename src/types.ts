import { QueryOrder } from 'mikro-orm'
import { ArgsType, Field, InputType, Int, registerEnumType } from 'type-graphql'
import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core'
import { FastifyRequest } from 'fastify'
import { RouteGenericInterface } from 'fastify/types/route'
import { IncomingMessage, Server } from 'http'
import { MercuriusContext } from 'mercurius'
import { User } from './entities/User'

registerEnumType(QueryOrder, {
  name: 'QueryOrder'
})

declare module 'mercurius' {
  export interface MercuriusContext {
    em: EntityManager<IDatabaseDriver<Connection>>
    user: User | null
    request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage, unknown>
  }
}

export type MainCtx = MercuriusContext

@InputType()
export class FilterExpressionInput {
  @Field()
  field!: string

  @Field({ nullable: true })
  eq?: string

  @Field({ nullable: true })
  ne?: string;

  @Field(() => [String], { nullable: true })
  in?: string[]

  @Field(() => [String], { nullable: true })
  nin?: string[]

  @Field({ nullable: true })
  gt?: string

  @Field({ nullable: true })
  gte?: string

  @Field({ nullable: true })
  lt?: string

  @Field({ nullable: true })
  lte?: string

  @Field({ nullable: true })
  like?: string

  @Field({ nullable: true })
  re?: string

  @Field({ nullable: true })
  ilike?: string

  @Field(() => [String], { nullable: true })
  overlap?: string[]

  @Field(() => [String], { nullable: true })
  contains?: string[]

  @Field(() => [String], { nullable: true })
  contained?: string[]
}

@InputType()
export class FilterInput {
  @Field({ nullable: true })
  expression?: FilterExpressionInput

  @Field(() => [FilterInput], { nullable: true })
  and?: [FilterInput]

  @Field(() => [FilterInput], { nullable: true })
  or?: [FilterInput]

  @Field({ nullable: true })
  not?: FilterInput

  @Field({ nullable: true })
  populate_field?: String

  @Field({ nullable: true })
  populate_filter?: FilterInput
}

@InputType()
export class Order {
  @Field()
  field!: string

  @Field(() => QueryOrder)
  query!: QueryOrder
}

@InputType()
export class PaginateInput {
  @Field(() => Int, { nullable: true })
  page?: number

  @Field(() => Int, { nullable: true })
  limit?: number

  @Field(() => Int, { nullable: true })
  offset?: number
}

@ArgsType()
export class BaseArgs {
  @Field({ nullable: true })
  _filter?: FilterInput

  @Field(() => [Order], { nullable: true })
  _orders?: [Order]

  @Field({ nullable: true })
  _paginate?: PaginateInput
}
