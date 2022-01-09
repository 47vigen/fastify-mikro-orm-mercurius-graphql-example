import { wrap } from 'mikro-orm'
import { GraphQLResolveInfo } from 'graphql'
import { Resolver, Query, Ctx, Arg, Mutation, Info, Args } from 'type-graphql'
import { Article } from '../../entities/Article'
import { MainCtx } from '../../types'
import { ArticleArguments, ArticleInput, ArticlesResponseCollection } from './types'
import { findWithOptions } from '../../utils/finds'

@Resolver(() => Article)
export class ArticleResolver {
  @Query(() => ArticlesResponseCollection)
  async articles(@Ctx() { em }: MainCtx, @Args() args: ArticleArguments, @Info() info: GraphQLResolveInfo): Promise<ArticlesResponseCollection> {
    return findWithOptions(em, Article, args, info, {})
  }

  @Mutation(() => Article)
  async createArticle(@Arg('input') input: ArticleInput, @Ctx() { em, user }: MainCtx): Promise<Article> {
    const article = new Article()
    wrap(article).assign({ ...input, author: user }, { em })
    await em.persistAndFlush(article)
    return article
  }
}
