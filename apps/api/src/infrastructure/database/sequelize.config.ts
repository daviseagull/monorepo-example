import { Sequelize } from 'sequelize'
import { parsedEnv } from '@/common/config/env.config'

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
