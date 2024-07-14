import { z } from 'zod'

const envSchema = z.object({
  ENV: z.enum(['PRD', 'STG', 'DEV', 'LOC']),
  PORT: z.coerce.number().nonnegative(),
  LOG_LEVEL: z.enum([
    'error',
    'warn',
    'info',
    'http',
    'verbose',
    'debug',
    'silly',
  ]),
  REGION: z.string(),
  APP_URL: z.string().url(),
  COGNITO_CLIENT_SECRET: z.string(),
  COGNITO_CLIENT_ID: z.string(),
  COGNITO_USER_POOL_ID: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_DIALECT: z.enum([
    'mysql',
    'postgres',
    'sqlite',
    'mariadb',
    'mssql',
    'db2',
    'snowflake',
    'oracle',
  ]),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
})

export const parsedEnv = envSchema.parse(process.env)
