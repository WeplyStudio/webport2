import { neon } from '@neondatabase/serverless'

export const sql = neon(process.env.DATABASE_URL!)

export interface ContactMessage {
  id: number
  name: string
  email: string
  services: string[]
  message: string
  created_at: string
  is_read: boolean
}

export interface AdminUser {
  id: number
  username: string
  password_hash: string
  created_at: string
}
