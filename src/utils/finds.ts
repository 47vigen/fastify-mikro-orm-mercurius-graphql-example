import { GraphQLResolveInfo } from 'graphql'
import { isArray, isObject, merge } from 'lodash'
import { AnyEntity, EntityManager, IDatabaseDriver, Connection, FindOptions, Collection, EntityName, FilterQuery, Populate } from 'mikro-orm'
import { MetaResponseCollection } from '../inheritance/types'
import { CACHE_EXPIRATION_TIME, PAGINATE_LIMIT } from '../constants'
import { fieldsToRelationsArgumentable } from './fieldsToRelations'
import { fieldsProjection } from 'graphql-fields-list'

const CONVERTABLE_FILTER_KEYS = [
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
const COUNT_NEEDABLE_KEYS = ['meta.pages', 'meta.total']

const checkFiltersKey = (key: string) => {
  if (CONVERTABLE_FILTER_KEYS.includes(key)) return '$' + key
  return key
}

const checkFiltersArray = (array: any[]): any[] => {
  return array.map((item) => (isArray(item) ? checkFiltersArray(item) : isObject(item) ? findWhere(item) : item))
}

export const findWhere = (filters: any = {}): any =>
  Object.fromEntries(
    Object.keys(filters).map((key) => {
      const value = filters[key]
      return [checkFiltersKey(key), isArray(value) ? checkFiltersArray(value) : isObject(value) ? findWhere(value) : value]
    })
  )

export const findOrderBy = (orderBy: any): any => {
  if (isArray(orderBy) && orderBy.length) {
    return Object.fromEntries(orderBy?.map((order) => [order.field, order.query]))
  }
  return undefined
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
  const isNeedingCount = !!Object.keys(fieldsProjection(info)).find((key) => COUNT_NEEDABLE_KEYS.includes(key))

  const FindWhere = merge(where, findWhere(args.filters)) as FilterQuery<T>
  const FindOptions = {
    limit,
    offset,
    cache: CACHE_EXPIRATION_TIME,
    orderBy: findOrderBy(args.orderBy),
    populate: fieldsToRelationsArgumentable(info, includes) as any
  } as FindOptions<T, P>

  if (isNeedingCount) {
    const [response, count] = await em.findAndCount(entityName, FindWhere, FindOptions)
    meta.pages = Math.ceil(count / limit)
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
  } else {
    return {
      data: collection,
      meta: { page: 1, pages: 1, limit: collection.count(), total: collection.count() }
    }
  }
}
