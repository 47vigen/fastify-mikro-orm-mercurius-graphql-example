import argon2 from 'argon2'
import { GraphQLResolveInfo } from 'graphql'
import { JsonWebTokenError } from 'jsonwebtoken'
import { Resolver, Query, Ctx, Arg, Mutation, Args, FieldResolver, Info, Root } from 'type-graphql'

import { MainCtx } from '../../types'
import { User } from '../../entities/User'
import { Article } from '../../entities/Article'
import { UserWithToken, UserInput } from './types'
import { ArticleArguments } from '../article/types'
import { findOrderBy, findPagination, findWhere } from '../../utils/findWithOptions'
import { sign, signRefresh, verifyRefresh } from '../../services/jwt'
import { fieldsToRelationsArgumentable } from './../../utils/fieldsToRelations'
import { merge } from 'lodash'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { user }: MainCtx): User | null {
    return user
  }

  @Mutation(() => UserWithToken)
  async register(@Arg('input') input: UserInput, @Ctx() { em, reply }: MainCtx): Promise<UserWithToken> {
    const hashedPassword = await argon2.hash(input.password)
    const user = em.create(User, { ...input, password: hashedPassword })
    await em.persistAndFlush(user)
    const token = sign(user.id)
    const refreshToken = signRefresh(user.id)
    reply.setCookie('refresh', refreshToken, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: true
    })
    return { token, user }
  }

  @Mutation(() => UserWithToken)
  async login(@Arg('input') input: UserInput, @Ctx() { em, reply }: MainCtx): Promise<UserWithToken> {
    const user = await em.findOne(User, { email: input.email })
    if (!user) throw new Error('Email not matched with password')
    const isVerified = await argon2.verify(user.password, input.password)
    if (!isVerified) throw new Error('Email not matched with password')
    const token = sign(user.id)
    const refreshToken = signRefresh(user.id)
    reply.setCookie('refresh', refreshToken, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: true
    })
    return { token, user }
  }

  @Mutation(() => String, { nullable: true })
  async refresh(@Ctx() { em, request, reply }: MainCtx): Promise<string | null> {
    try {
      const refreshToken = request.cookies.refresh
      if (refreshToken) {
        const verfiedRefresh = verifyRefresh(refreshToken) as any
        if (verfiedRefresh?.id) {
          const user = await em.findOne(User, { id: verfiedRefresh.id })
          if (user) {
            const token = sign(user.id)
            return token
          }
        }
      }
      return null
    } catch (e) {
      reply.clearCookie('refresh')
      if (e instanceof JsonWebTokenError) {
        throw new Error('you must login')
      } else throw e
    }
  }

  @FieldResolver(() => [Article], { nullable: true })
  async articles(
    @Root() root: User,
    @Ctx() { em }: MainCtx,
    @Info() info: GraphQLResolveInfo,
    @Args() args: ArticleArguments
  ): Promise<Article[] | null> {
    if (Object.keys(args).length) {
      return em.find(Article, merge({ author: { id: { $eq: root.id } } }, findWhere(args.filters)), {
        populate: fieldsToRelationsArgumentable(info, ['description', 'fullbody']),
        orderBy: findOrderBy(args.orderBy),
        ...findPagination(args.pagination)
      })
    } else return root.articles.toJSON() as Article[] | null
  }
}
