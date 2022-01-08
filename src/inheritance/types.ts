import { QueryOrder } from 'mikro-orm'
import { ArgsType, Field, Float, ID, InputType, Int, ObjectType, registerEnumType } from 'type-graphql'

registerEnumType(QueryOrder, {
  name: 'QueryOrder'
})

@InputType()
export class IDFilterInput {
  @Field(() => [ID], { nullable: true })
  and?: string[]

  @Field(() => [ID], { nullable: true })
  or?: string[]

  @Field(() => IDFilterInput, { nullable: true })
  not?: IDFilterInput

  @Field(() => ID, { nullable: true })
  eq?: string

  @Field(() => ID, { nullable: true })
  ne?: string;

  @Field(() => [ID], { nullable: true })
  in?: string[]

  @Field(() => [ID], { nullable: true })
  nin?: string[]

  @Field(() => ID, { nullable: true })
  gt?: string

  @Field(() => ID, { nullable: true })
  gte?: string

  @Field(() => ID, { nullable: true })
  lt?: string

  @Field(() => ID, { nullable: true })
  lte?: string

  @Field(() => ID, { nullable: true })
  like?: string

  @Field(() => ID, { nullable: true })
  re?: string

  @Field(() => ID, { nullable: true })
  ilike?: string

  @Field(() => [ID], { nullable: true })
  overlap?: string[]

  @Field(() => [ID], { nullable: true })
  contains?: string[]

  @Field(() => [ID], { nullable: true })
  contained?: string[]
}

@InputType()
export class BooleanFilterInput {
  @Field(() => [Boolean], { nullable: true })
  and?: boolean[]

  @Field(() => [Boolean], { nullable: true })
  or?: boolean[]

  @Field(() => BooleanFilterInput, { nullable: true })
  not?: BooleanFilterInput

  @Field(() => Boolean, { nullable: true })
  eq?: boolean

  @Field(() => Boolean, { nullable: true })
  ne?: boolean;

  @Field(() => [Boolean], { nullable: true })
  in?: boolean[]

  @Field(() => [Boolean], { nullable: true })
  nin?: boolean[]

  @Field(() => Boolean, { nullable: true })
  gt?: boolean

  @Field(() => Boolean, { nullable: true })
  gte?: boolean

  @Field(() => Boolean, { nullable: true })
  lt?: boolean

  @Field(() => Boolean, { nullable: true })
  lte?: boolean

  @Field(() => Boolean, { nullable: true })
  like?: boolean

  @Field(() => Boolean, { nullable: true })
  re?: boolean

  @Field(() => Boolean, { nullable: true })
  ilike?: boolean

  @Field(() => [Boolean], { nullable: true })
  overlap?: boolean[]

  @Field(() => [Boolean], { nullable: true })
  contains?: boolean[]

  @Field(() => [Boolean], { nullable: true })
  contained?: boolean[]
}

@InputType()
export class StringFilterInput {
  @Field(() => [String], { nullable: true })
  and?: string[]

  @Field(() => [String], { nullable: true })
  or?: string[]

  @Field(() => StringFilterInput, { nullable: true })
  not?: StringFilterInput

  @Field(() => String, { nullable: true })
  eq?: string

  @Field(() => String, { nullable: true })
  ne?: string;

  @Field(() => [String], { nullable: true })
  in?: string[]

  @Field(() => [String], { nullable: true })
  nin?: string[]

  @Field(() => String, { nullable: true })
  gt?: string

  @Field(() => String, { nullable: true })
  gte?: string

  @Field(() => String, { nullable: true })
  lt?: string

  @Field(() => String, { nullable: true })
  lte?: string

  @Field(() => String, { nullable: true })
  like?: string

  @Field(() => String, { nullable: true })
  re?: string

  @Field(() => String, { nullable: true })
  ilike?: string

  @Field(() => [String], { nullable: true })
  overlap?: string[]

  @Field(() => [String], { nullable: true })
  contains?: string[]

  @Field(() => [String], { nullable: true })
  contained?: string[]
}

@InputType()
export class IntFilterInput {
  @Field(() => [Int], { nullable: true })
  and?: number[]

  @Field(() => [Int], { nullable: true })
  or?: number[]

  @Field(() => IntFilterInput, { nullable: true })
  not?: IntFilterInput

  @Field(() => Int, { nullable: true })
  eq?: number

  @Field(() => Int, { nullable: true })
  ne?: string;

  @Field(() => [Int], { nullable: true })
  in?: number[]

  @Field(() => [Int], { nullable: true })
  nin?: number[]

  @Field(() => Int, { nullable: true })
  gt?: number

  @Field(() => Int, { nullable: true })
  gte?: number

  @Field(() => Int, { nullable: true })
  lt?: number

  @Field(() => Int, { nullable: true })
  lte?: number

  @Field(() => Int, { nullable: true })
  like?: number

  @Field(() => Int, { nullable: true })
  re?: number

  @Field(() => Int, { nullable: true })
  ilike?: number

  @Field(() => [Int], { nullable: true })
  overlap?: number[]

  @Field(() => [Int], { nullable: true })
  contains?: number[]

  @Field(() => [Int], { nullable: true })
  contained?: number[]
}

@InputType()
export class FloatFilterInput {
  @Field(() => [Float], { nullable: true })
  and?: number[]

  @Field(() => [Float], { nullable: true })
  or?: number[]

  @Field(() => FloatFilterInput, { nullable: true })
  not?: FloatFilterInput

  @Field(() => Float, { nullable: true })
  eq?: number

  @Field(() => Float, { nullable: true })
  ne?: number;

  @Field(() => [Float], { nullable: true })
  in?: number[]

  @Field(() => [Float], { nullable: true })
  nin?: number[]

  @Field(() => Float, { nullable: true })
  gt?: number

  @Field(() => Float, { nullable: true })
  gte?: number

  @Field(() => Float, { nullable: true })
  lt?: number

  @Field(() => Float, { nullable: true })
  lte?: number

  @Field(() => Float, { nullable: true })
  like?: number

  @Field(() => Float, { nullable: true })
  re?: number

  @Field(() => Float, { nullable: true })
  ilike?: number

  @Field(() => [Float], { nullable: true })
  overlap?: number[]

  @Field(() => [Float], { nullable: true })
  contains?: number[]

  @Field(() => [Float], { nullable: true })
  contained?: number[]
}

@InputType()
export class DateFilterInput {
  @Field(() => [Date], { nullable: true })
  and?: Date[]

  @Field(() => [Date], { nullable: true })
  or?: Date[]

  @Field(() => DateFilterInput, { nullable: true })
  not?: DateFilterInput

  @Field(() => Date, { nullable: true })
  eq?: Date

  @Field(() => Date, { nullable: true })
  ne?: Date;

  @Field(() => [Date], { nullable: true })
  in?: Date[]

  @Field(() => [Date], { nullable: true })
  nin?: Date[]

  @Field(() => Date, { nullable: true })
  gt?: Date

  @Field(() => Date, { nullable: true })
  gte?: Date

  @Field(() => Date, { nullable: true })
  lt?: Date

  @Field(() => Date, { nullable: true })
  lte?: Date

  @Field(() => Date, { nullable: true })
  like?: Date

  @Field(() => Date, { nullable: true })
  re?: Date

  @Field(() => Date, { nullable: true })
  ilike?: Date

  @Field(() => [Date], { nullable: true })
  overlap?: Date[]

  @Field(() => [Date], { nullable: true })
  contains?: Date[]

  @Field(() => [Date], { nullable: true })
  contained?: Date[]
}

@InputType()
export class JSONFilterInput {
  @Field(() => [JSON], { nullable: true })
  and?: JSON[]

  @Field(() => [JSON], { nullable: true })
  or?: JSON[]

  @Field(() => JSONFilterInput, { nullable: true })
  not?: JSONFilterInput

  @Field(() => JSON, { nullable: true })
  eq?: JSON

  @Field(() => JSON, { nullable: true })
  ne?: JSON;

  @Field(() => [JSON], { nullable: true })
  in?: JSON[]

  @Field(() => [JSON], { nullable: true })
  nin?: JSON[]

  @Field(() => JSON, { nullable: true })
  gt?: JSON

  @Field(() => JSON, { nullable: true })
  gte?: JSON

  @Field(() => JSON, { nullable: true })
  lt?: JSON

  @Field(() => JSON, { nullable: true })
  lte?: JSON

  @Field(() => JSON, { nullable: true })
  like?: JSON

  @Field(() => JSON, { nullable: true })
  re?: JSON

  @Field(() => JSON, { nullable: true })
  ilike?: JSON

  @Field(() => [JSON], { nullable: true })
  overlap?: JSON[]

  @Field(() => [JSON], { nullable: true })
  contains?: JSON[]

  @Field(() => [JSON], { nullable: true })
  contained?: JSON[]
}

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  page?: number

  @Field(() => Int, { nullable: true })
  limit?: number

  @Field(() => Int, { nullable: true })
  offset?: number
}

@InputType()
export class BaseFiltersInput {
  @Field(() => IDFilterInput, { nullable: true })
  id?: IDFilterInput

  @Field(() => DateFilterInput, { nullable: true })
  createdAt?: DateFilterInput

  @Field(() => DateFilterInput, { nullable: true })
  updatedAt?: DateFilterInput
}

@InputType()
export class Order {
  @Field(() => String)
  field!: string

  @Field(() => QueryOrder)
  query!: QueryOrder
}

@ArgsType()
export class BaseArguments {
  @Field(() => PaginationInput, { nullable: true })
  pagination?: PaginationInput

  @Field(() => [Order], { nullable: true })
  orderBy?: Order[]
}

@ObjectType()
export class MetaResponseCollection {
  @Field(() => Int, { nullable: true })
  page?: number

  @Field(() => Int, { nullable: true })
  pages?: number

  @Field(() => Int, { nullable: true })
  total?: number

  @Field(() => Int, { nullable: true })
  limit?: number
}

@ObjectType()
export class BaseResponseCollection {
  @Field(() => MetaResponseCollection, { nullable: true })
  meta?: MetaResponseCollection
}
