
import { Pool } from "pg"
import { env } from '@/src/utils/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@/src/database/schema/index"

export const pool = new Pool({
    connectionString: env.DATABASE_URL
})

export const db = drizzle(pool, { schema: schema })
