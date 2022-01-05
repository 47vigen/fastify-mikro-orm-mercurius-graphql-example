import 'reflect-metadata'
import Fastify from 'fastify'
import cors from 'fastify-cors'
import mercurius from 'mercurius'
import cookie from 'fastify-cookie'
import { MikroORM } from 'mikro-orm'
import { buildSchema } from 'type-graphql'
import mercuriusUpload from 'mercurius-upload'

import ormConfig from './mikro-orm.config'
import { UserResolver } from './resolvers/user'
import { ArticleResolver } from './resolvers/article'
import userGraphQLHook from './hooks/userAuthHook'
import { HOST, ENV, PORT, COOKIE_SECRET, SERVER } from './constants'

// server starter function
;(async () => {
  const orm = await MikroORM.init(ormConfig)

  const app = Fastify()

  app.register(cors, {
    origin: [SERVER],
    credentials: true
  })
  app.register(cookie, {
    secret: COOKIE_SECRET
  })
  app.register(mercuriusUpload)
  app.register(mercurius, {
    schema: await buildSchema({
      resolvers: [UserResolver, ArticleResolver],
      validate: true
    }),
    context: (request, reply) => ({
      em: orm.em,
      request,
      reply
    }),
    graphiql: true,
    path: '/graphql'
  })

  await app.ready()

  app.graphql.addHook('preExecution', userGraphQLHook)

  setImmediate(() => {
    app.listen({ port: PORT, host: HOST }).then(() => {
      console.log('🚀 Server ready at http://%s:%d, in %s mode', HOST, PORT, ENV)
      console.log('🎮 graphql playground at http://localhost:%d/graphiql !', PORT)
    })
  })
})()
