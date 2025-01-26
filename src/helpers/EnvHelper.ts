import NodeEnv from '@/types/enums/NodeEnv'

export default class EnvHelper {
  static PORT: number = Number(process.env.PORT) || 3000
  static NODE_ENV: string = process.env.NODE_ENV || NodeEnv.DEVELOPMENT
  static BCRYPT_SALT_ROUNDS: number = Number(process.env.BCRYPT_SALT_ROUNDS) || 10
  static JWT_PRIVATE_KEY: string = process.env.JWT_PRIVATE_KEY || ''
  static DB_DIALECT: string = process.env.DB_DIALECT?.toLowerCase() || ''
  static DB_NAME: string = process.env.DB_NAME || ''
  static DB_USERNAME: string = process.env.DB_USERNAME || ''
  static DB_PASSWORD: string = process.env.DB_PASSWORD || ''
  static DB_HOST: string = process.env.DB_HOST || ''
  static DB_SSL: boolean = (process.env.DB_SSL || 'false').toLowerCase() === 'true'
  static DB_PORT: number = Number(process.env.DB_PORT) || 5432
  static SERVER_HOST: string = process.env.SERVER_HOST || ''
}
