import { StringFilterInput, BaseFiltersInput, BaseArguments } from '../../inheritance/types'
import { ArgsType, Field, InputType } from 'type-graphql'
import { UserFiltersInput } from '../user/types'

@InputType()
export class ArticleInput {
  @Field()
  slug!: string
  @Field()
  title!: string
  @Field()
  description!: string
  @Field()
  fullbody!: string
}

@InputType()
export class ArticleFiltersInput extends BaseFiltersInput {
  @Field(() => StringFilterInput, { nullable: true })
  slug?: StringFilterInput

  @Field(() => StringFilterInput, { nullable: true })
  title?: StringFilterInput

  @Field(() => StringFilterInput, { nullable: true })
  description?: StringFilterInput

  @Field(() => StringFilterInput, { nullable: true })
  fullbody?: StringFilterInput

  @Field(() => UserFiltersInput, { nullable: true })
  author?: UserFiltersInput

  @Field(() => [ArticleFiltersInput], { nullable: true })
  and?: [ArticleFiltersInput]

  @Field(() => [ArticleFiltersInput], { nullable: true })
  or?: [ArticleFiltersInput]

  @Field(() => ArticleFiltersInput, { nullable: true })
  not?: ArticleFiltersInput
}

@ArgsType()
export class ArticleArguments extends BaseArguments {
  @Field(() => ArticleFiltersInput, { nullable: true })
  filters?: ArticleFiltersInput
}
