import { preExecutionHookHandler } from 'mercurius'
import { verify } from '../services/jwt'
import { MainCtx } from '../types'
import { User } from '../entities/User'

const userGraphQLHook: preExecutionHookHandler = async (schema, document, context: MainCtx) => {
  const token = context.reply.request.headers.authorization?.split('Bearer ')[1]
  try {
    if (token) {
      const verfiedToken = verify(token) as any
      if (verfiedToken?.id) {
        const user = await context.em.findOne(User, { id: verfiedToken.id }, { cache: [token, 1000 * 60] })
        context.user = user
      }
    }
  } catch (error) {
    context.user = null
  }

  return {
    schema,
    document,
    context
  }
}

export default userGraphQLHook
