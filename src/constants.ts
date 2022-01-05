import 'dotenv-safe/config'

export const ENV: string = process.env.NODE_ENV || 'development'
export const PROD: boolean = process.env.NODE_ENV === 'production'
export const SERVER: string = process.env.SERVER || 'localhost:3000'
export const HOST: string = process.env.IP || '0.0.0.0'
export const PORT: number = Number(process.env.PORT) || 9000

export const DATABASE_HOST: string = process.env.DATABASE_HOST
export const DATABASE_USER: string = process.env.DATABASE_USER
export const DATABASE_NAME: string = process.env.DATABASE_NAME
export const DATABASE_PASS: string = process.env.DATABASE_PASS

export const JWT_SECRET: string = process.env.JWT_SECRET
export const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET

export const COOKIE_SECRET: string = process.env.COOKIE_SECRET

export const PAGINATE_LIMIT: number = Number(process.env.PAGINATE_LIMIT) || 20
export const DEFAULT_CACHE: number = Number(process.env.DEFAULT_CACHE) || 10000
