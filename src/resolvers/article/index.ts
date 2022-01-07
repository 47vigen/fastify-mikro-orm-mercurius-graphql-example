import { wrap } from 'mikro-orm'
import { GraphQLResolveInfo } from 'graphql'
import { Resolver, Query, Ctx, Arg, Mutation, Info, Args } from 'type-graphql'
import { Article } from '../../entities/Article'
import { MainCtx } from '../../types'
import { ArticleArguments, ArticleInput } from './types'
import { findOrderBy, findPagination, findWhere } from '../../utils/findWithOptions'
import { fieldsToRelationsArgumentable } from '../../utils/fieldsToRelations'

@Resolver(() => Article)
export class ArticleResolver {
  @Query(() => [Article], { nullable: true })
  articles(@Ctx() { em }: MainCtx, @Args() args: ArticleArguments, @Info() info: GraphQLResolveInfo): Promise<Article[] | null> {
    return em.find(Article, findWhere(args.filters), {
      populate: fieldsToRelationsArgumentable(info, ['description', 'fullbody']),
      orderBy: findOrderBy(args.orderBy),
      ...findPagination(args.pagination)
    })
  }

  @Mutation(() => Article)
  async createArticle(@Arg('input') input: ArticleInput, @Ctx() { em, user }: MainCtx): Promise<Article> {
    const article = new Article()
    wrap(article).assign({ ...input, author: user }, { em })
    await em.persistAndFlush(article)
    return article
  }
}
