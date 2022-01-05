import { wrap } from 'mikro-orm'
import { GraphQLResolveInfo } from 'graphql'
import { Resolver, Query, Ctx, Arg, Mutation, Field, Info, Args, InputType } from 'type-graphql'
import { Article } from '../entities/Article'
import { MainCtx, BaseArgs } from '../types'
import renderArgs from '../utils/renderArgs'

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

@Resolver()
export class ArticleResolver {
  @Query(() => [Article], { nullable: true })
  articles(@Args() args: BaseArgs, @Ctx() { em }: MainCtx, @Info() info: GraphQLResolveInfo): Promise<Article[] | null> {
    return em.find(Article, renderArgs(args, info).where, renderArgs(args, info).options)
  }

  @Mutation(() => Article)
  async createArticle(@Arg('input') input: ArticleInput, @Ctx() { em, user }: MainCtx): Promise<Article> {
    const article = new Article()
    wrap(article).assign({ ...input, author: user }, { em })
    await em.persistAndFlush(article)
    return article
  }
}
