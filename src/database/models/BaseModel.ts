import PaginationHelper from '@/helpers/PaginationHelper'
import SequelizeHelper from '@/helpers/SequelizeHelper'
import Pager from '@/types/pagination/Pager'
import Paging from '@/types/pagination/Paging'
import { InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export default class BaseModel {
  static paginate<T extends Model<InferAttributes<T>, InferCreationAttributes<T>>, RT>(
    pager: Pager,
    total_items: number,
    documents: T[],
    omit?: string[]
  ): Paging<RT> {
    const page_count: number = PaginationHelper.pageCount(pager.page_size, total_items)
    const data: RT[] = documents.map((document: T) => SequelizeHelper.toJSON<RT>(document.toJSON(), omit))
    return {
      pager: {
        ...pager,
        page_count,
        total_items
      },
      data
    }
  }

  static toJSON<T extends Model<InferAttributes<T>, InferCreationAttributes<T>>, RT>(
    document: T | null,
    omit?: string[]
  ): RT | null {
    const object: any = document?.toJSON()
    return object ? SequelizeHelper.toJSON<RT>(object, omit) : null
  }
}
