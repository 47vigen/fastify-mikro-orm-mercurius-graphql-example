import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../constants'

export const sign = (id: string, options?: jwt.SignOptions) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '30m', ...options })

export const signRefresh = (id: string, options?: jwt.SignOptions) => jwt.sign({ id }, JWT_REFRESH_SECRET, { expiresIn: '7d', ...options })

export const verify = (token: string) => jwt.verify(token, JWT_SECRET)

export const verifyRefresh = (token: string) => jwt.verify(token, JWT_REFRESH_SECRET)
