import DatabaseField from '@/types/enums/DatabaseField'
import Pager from '@/types/pagination/Pager'
import Paging from '@/types/pagination/Paging'
import { Dialect, InferAttributes, InferCreationAttributes, Model, Op, Options, Sequelize } from 'sequelize'
import EnvHelper from './EnvHelper'
import PaginationHelper from './PaginationHelper'

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

export const sequelize = new Sequelize(EnvHelper.DB_NAME, EnvHelper.DB_USERNAME, EnvHelper.DB_PASSWORD, options)

export default class SequelizeHelper {
  static async connect() {
    await sequelize.authenticate()
    // await sequelize.sync({ force: true })
  }

  static paginate<T extends Model<InferAttributes<T>, InferCreationAttributes<T>>, RT>(
    documents: T[],
    pager: Pager,
    total_items: number
  ): Paging<RT> {
    const page_count: number = PaginationHelper.pageCount(pager.page_size, total_items)
    const data: RT[] = documents.map((document: T) => document.toJSON() as RT)
    const paging: Paging<RT> = { pager: { ...pager, total_items, page_count }, data }
    return paging
  }

  static aggregate(pager: Pager, filters: any, freeTextFields?: string[]): any {
    const { page_size, page_index, sort_field, sort_direction } = pager
    const offset: number = (page_index - 1) * page_size
    const data: any = { offset }

    if (page_size > 0) {
      data.limit = page_size
    }

    if (sort_field && sort_direction) {
      data.order = [[sort_field, sort_direction]]
    }

    data.where = this.aggregateWhere(filters, freeTextFields)

    return data
  }

  private static aggregateWhere(filters: any, freeTextFields?: string[]) {
    const where: any = { [Op.and]: [] }
    const entries: any[] = Object.entries(filters)

    entries
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) => {
        if (key.toLowerCase() === DatabaseField.FREE_TEXT && freeTextFields?.length) {
          where[Op.and].push(this.freeText(value, freeTextFields))
        } else if (key.toLowerCase() !== DatabaseField.FREE_TEXT) {
          where[Op.and].push([{ [key]: value }])
        }
      })

    return where
  }

  private static freeText(free_text: string, fields: string[]): any[] {
    const filters: any[] = fields.map((field: string) => ({
      [field]: { [Op.substring]: free_text }
    }))

    return [{ [Op.or]: filters }]
  }
}
