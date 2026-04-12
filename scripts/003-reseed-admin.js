import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

const sql = neon(process.env.DATABASE_URL)

async function seedAdmin() {
  const password = 'Semarang20?'
  const hash = await bcrypt.hash(password, 10)
  
  console.log('Generated hash:', hash)
  
  await sql`
    INSERT INTO admin_users (username, password_hash)
    VALUES ('admin', ${hash})
    ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash
  `
  
  console.log('Admin user seeded successfully!')
}

seedAdmin().catch(console.error)
