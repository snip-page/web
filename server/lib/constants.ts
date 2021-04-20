import { join } from 'path'

export const DEV = process.env.NODE_ENV === 'development'
export const PORT = process.env.PORT ?? '5000'

export const ORIGIN = process.env.NEXT_PUBLIC_ORIGIN
if (!ORIGIN) throw new Error('Missing origin')

export const ROOT = join(__dirname, '..', '..')
