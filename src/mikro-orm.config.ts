import path from 'path'

import { merge } from 'lodash'
import { MikroORM } from 'mikro-orm'
import { RedisCacheAdapter, RedisCacheAdapterOptions } from 'mikro-orm-cache-adapter-redis'
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASS, DATABASE_USER, DEFAULT_CACHE, PROD } from './constants'

import { User } from './entities/User'
import { Article } from './entities/Article'

const defaultOptions = {
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
  }
} as Parameters<typeof MikroORM.init>[0]

const productionOptions = {
  resultCache: {
    expiration: DEFAULT_CACHE,
    adapter: RedisCacheAdapter,
    options: { expiration: DEFAULT_CACHE } as RedisCacheAdapterOptions
  }
} as Parameters<typeof MikroORM.init>[0]

export default merge(defaultOptions, PROD && productionOptions) as Parameters<typeof MikroORM.init>[0]
