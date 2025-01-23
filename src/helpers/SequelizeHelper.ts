import { Dialect, Options, Sequelize } from 'sequelize'
import EnvHelper from './EnvHelper'

export default class SequelizeHelper {
  static connection(): Sequelize {
    const options: Options = {
      host: EnvHelper.DB_HOST,
      port: EnvHelper.DB_PORT,
      dialect: EnvHelper.DB_DIALECT as Dialect,
      ssl: EnvHelper.DB_SSL,
      logging: false
    }

    if (EnvHelper.DB_SSL) {
      options.dialectOptions = {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }

    return new Sequelize(EnvHelper.DB_NAME, EnvHelper.DB_USERNAME, EnvHelper.DB_PASSWORD, options)
  }
}
