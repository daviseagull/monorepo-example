import { parsedEnv } from '@/common/config/env.config'
import { Sequelize } from 'sequelize'

const db = new Sequelize(
  parsedEnv.DATABASE_NAME,
  parsedEnv.DATABASE_USERNAME,
  parsedEnv.DATABASE_PASSWORD,
  {
    dialect: parsedEnv.DATABASE_DIALECT,
    port: parsedEnv.DATABASE_PORT,
    host: parsedEnv.DATABASE_HOST,
    logging: false,
  }
)
export default db
