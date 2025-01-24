import Pager from '@/types/pagination/Pager'
import { Dialect, Op, Options, Sequelize } from 'sequelize'
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

  static paginate(pager: Pager) {
    const { page_size, page_index, sort_field, sort_direction } = pager
    const offset: number = (page_index - 1) * page_size
    const data: any = { offset }

    if (page_size > 0) {
      data.limit = page_size
    }

    if (sort_field && !sort_direction) {
      data.order = [[sort_field]]
    } else if (sort_field && sort_direction) {
      data.order = [[sort_field, sort_direction.toUpperCase()]]
    }

    return data
  }

  static freeText(free_text: string, fields: string[]): any[] {
    const filters: any[] = fields.map((field: string) => ({
      [field]: { [Op.substring]: free_text }
    }))

    return [{ [Op.or]: filters }]
  }
}
