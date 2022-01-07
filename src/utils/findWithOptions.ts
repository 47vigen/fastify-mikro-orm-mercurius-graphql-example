import { isArray, isObject } from 'lodash'
import { PAGINATE_LIMIT } from './../constants'

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
  return { limit, offset }
}
