import { StringFilterInput, BaseFiltersInput, BaseArguments } from '../../inheritance/types'
import { ArgsType, Field, InputType, ObjectType, registerEnumType } from 'type-graphql'
import { ArticleFiltersInput } from '../article/types'
import { User } from '../../entities/User'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

registerEnumType(UserRole, {
  name: 'UserRole'
})

@InputType()
export class UserInput {
  @Field(() => String)
  email!: string
  @Field(() => String)
  password!: string
}

@ObjectType()
export class UserWithToken {
  @Field(() => User)
  user!: User
  @Field(() => String)
  token!: string
}

@InputType()
export class UserFiltersInput extends BaseFiltersInput {
  @Field(() => StringFilterInput, { nullable: true })
  email?: StringFilterInput

  @Field(() => UserRole, { nullable: true })
  role?: UserRole

  @Field(() => ArticleFiltersInput, { nullable: true })
  articles?: ArticleFiltersInput

  @Field(() => [UserFiltersInput], { nullable: true })
  and?: [UserFiltersInput]

  @Field(() => [UserFiltersInput], { nullable: true })
  or?: [UserFiltersInput]

  @Field(() => UserFiltersInput, { nullable: true })
  not?: UserFiltersInput
}

@ArgsType()
export class UserArguments extends BaseArguments {
  @Field(() => StringFilterInput, { nullable: true })
  filters?: UserFiltersInput
}
