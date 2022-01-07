import path from 'path'

import { MikroORM } from 'mikro-orm'
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASS, DATABASE_USER, PROD } from './constants'

import { User } from './entities/User'
import { Article } from './entities/Article'
import { RedisCacheAdapter, RedisCacheAdapterOptions } from 'mikro-orm-cache-adapter-redis'

export default {
  entities: [User, Article],
  type: 'postgresql',
  host: DATABASE_HOST,
  dbName: DATABASE_NAME,
  user: DATABASE_USER,
  password: DATABASE_PASS,
  debug: !PROD,
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/
  },
  resultCache: PROD
    ? {
        expiration: 10000,
        adapter: RedisCacheAdapter,
        options: {} as RedisCacheAdapterOptions
      }
    : undefined
} as Parameters<typeof MikroORM.init>[0]
