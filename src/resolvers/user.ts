import { Resolver, Query, Ctx, Arg, Mutation, InputType, Field, ObjectType } from 'type-graphql'
import { sign, signRefresh, verifyRefresh } from './../services/jwt'
import { User } from '../entities/User'
import { MainCtx } from '../types'
import argon2 from 'argon2'
import { JsonWebTokenError } from 'jsonwebtoken'

@InputType()
class UserInput {
  @Field()
  email!: string
  @Field()
  password!: string
}

@ObjectType()
class UserWithToken {
  @Field()
  user!: User
  @Field()
  token!: string
}

@Resolver()
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
}
