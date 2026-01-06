import { z } from "zod"

const envSchema = z.object({
    DATABASE_URL: z.url()
  })
  
export const env = envSchema.parse(process.env)

const variableKeys = Object.keys(env).length
const variableValues = Object.values(env).length
console.log(
    "✅ Environment variables loaded successfully: " 
    + variableValues + "/" + variableKeys
)