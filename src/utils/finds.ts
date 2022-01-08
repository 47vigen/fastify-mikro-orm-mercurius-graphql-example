import { GraphQLResolveInfo } from 'graphql'
import { isArray, isObject, merge } from 'lodash'
import { AnyEntity, EntityManager, IDatabaseDriver, Connection, FindOptions, Collection, EntityName, FilterQuery, Populate } from 'mikro-orm'
import { MetaResponseCollection } from '../inheritance/types'
import { DEFAULT_CACHE, PAGINATE_LIMIT } from '../constants'
import { fieldsToRelationsArgumentable } from './fieldsToRelations'
import { fieldsProjection } from 'graphql-fields-list'

const checkKey = (key: string) => {
  const convetableKeys = [
    'and',
    'or',
    'not',
    'eq',
    'ne',
    'in',
    'nin',
    'gt',
    'gte',
    'lt',
    'lte',
    'like',
    're',
    'ilike',
    'overlap',
    'contains',
    'contained'
  ]

  if (convetableKeys.includes(key)) return '$' + key
  return key
}

const checkArray = (array: any[]): any[] => {
  return array.map((item) => (isArray(item) ? checkArray(item) : isObject(item) ? findWhere(item) : item))
}

export const findWhere = (filters: any = {}): any =>
  Object.fromEntries(
    Object.keys(filters).map((key) => {
      const value = filters[key]
      return [checkKey(key), isArray(value) ? checkArray(value) : isObject(value) ? findWhere(value) : value]
    })
  )

export const findOrderBy = (orderBy: any): any => {
  if (isArray(orderBy) && orderBy.length) {
    return Object.fromEntries(orderBy?.map((order) => [order.field, order.query]))
  }
  return undefined
}

export const findPagination = (pagination: any) => {
  const limit = pagination?.limit || PAGINATE_LIMIT
  const page = (pagination?.page || 0) - 1 <= 0 ? 0 : (pagination?.page || 0) - 1
  const offset = pagination?.offset || page * limit
  return { limit, offset, cache: DEFAULT_CACHE }
}

export const findWithOptions = async <T extends AnyEntity<T>, P extends Populate<T> = any>(
  em: EntityManager<IDatabaseDriver<Connection>>,
  entityName: EntityName<T>,
  args: any,
  info: GraphQLResolveInfo,
  where: FilterQuery<T> = {},
  includes?: string[]
): Promise<{ meta: MetaResponseCollection; data: T[] | undefined }> => {
  const limit = args.pagination?.limit || PAGINATE_LIMIT
  const page = (args.pagination?.page || 0) - 1 <= 0 ? 0 : (args.pagination?.page || 0) - 1
  const offset = args.pagination?.offset || page * limit

  let data: T[] | (undefined & any) = []
  let meta: MetaResponseCollection = { page: page + 1, limit }
  const needCount = Object.keys(fieldsProjection(info)).includes('meta.pages') || Object.keys(fieldsProjection(info)).includes('meta.total')

  const FindWhere = merge(where, findWhere(args.filters)) as FilterQuery<T>
  const FindOptions = {
    limit,
    offset,
    cache: DEFAULT_CACHE,
    orderBy: findOrderBy(args.orderBy),
    populate: fieldsToRelationsArgumentable(info, includes) as any
  } as FindOptions<T, P>

  if (needCount) {
    const [response, count] = await em.findAndCount(entityName, FindWhere, FindOptions)
    meta.pages = Math.ceil(count / (FindOptions.limit || PAGINATE_LIMIT))
    meta.total = count
    data = response
  } else {
    data = await em.find(entityName, FindWhere, FindOptions)
  }

  return { data, meta }
}

export const findRelationalWithOptions = async <T extends AnyEntity<T>>(
  em: EntityManager<IDatabaseDriver<Connection>>,
  entityName: EntityName<T>,
  args: any,
  info: GraphQLResolveInfo,
  where: FilterQuery<T> = {},
  collection: Collection<T> | any,
  includes?: string[]
): Promise<{ meta?: MetaResponseCollection; data: T[] | undefined }> => {
  if (Object.keys(args).length) {
    return await findWithOptions(em, entityName, args, info, where, includes)
  } else if (typeof collection.toJSON === 'function') {
    return Object.assign(collection, {
      data: collection.toJSON() as T[] | undefined,
      meta: { page: 1, pages: 1, limit: collection.count(), total: collection.count() }
    })
  } else if (isArray(collection)) {
    return {
      data: collection as T[] | undefined,
      meta: { page: 1, pages: 1, limit: collection.length, total: collection.length }
    }
  }
  return { data: undefined }
}
