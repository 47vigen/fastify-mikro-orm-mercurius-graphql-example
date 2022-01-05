import { GraphQLResolveInfo } from 'graphql'
import { fieldsProjection } from 'graphql-fields-list'
import fieldsToRelations from 'graphql-fields-to-relations'
import { BaseArgs, FilterExpressionInput, FilterInput } from '../types'
import { DEFAULT_CACHE, PAGINATE_LIMIT } from '../constants'

const expressionToQuery = ({ field, ...expression }: FilterExpressionInput & any) => {
  return { [field]: Object.fromEntries(Object.keys(expression).map((key) => [`$${key}`, expression[key]])) }
}

const filtersToWhere = ({ populate_field, populate_filter, ...filter }: FilterInput & any = {}) => {
  const mapped: any[] = []

  Object.keys(filter).map((key: string) => {
    if (key === 'expression') {
      const queries: FilterExpressionInput & any = expressionToQuery(filter[key])
      Object.keys(queries).map((key: string) => mapped.push([key, queries[key]]))
    } else mapped.push([key, Array.isArray(filter[key]) ? filter[key].map((item: any) => filtersToWhere(item)) : filtersToWhere(filter[key])])
  })

  if (populate_field && populate_filter) {
    mapped.push([populate_field, filtersToWhere(populate_filter)])
  }

  return Object.fromEntries(mapped)
}

const renderArgs = (args: BaseArgs, info: GraphQLResolveInfo): any => {
  const page = (args._paginate?.page || 0) - 1 <= 0 ? 0 : (args._paginate?.page || 0) - 1
  const rederedArgs = {
    where: filtersToWhere(args._filter),
    options: {
      refresh: true,
      populate: fieldsToRelations(info),
      limit: args._paginate?.limit || PAGINATE_LIMIT,
      fields: Object.keys(fieldsProjection(info, { keepParentField: true })),
      offset: args._paginate?.offset || page * (args._paginate?.limit || PAGINATE_LIMIT),
      orderBy: args._orders?.length ? Object.fromEntries(args._orders?.map((order) => [order.field, order.query])) : undefined
    }
  }
  return { where: rederedArgs.where, options: { ...rederedArgs.options, cache: [JSON.stringify(rederedArgs), DEFAULT_CACHE] } }
}

export default renderArgs
