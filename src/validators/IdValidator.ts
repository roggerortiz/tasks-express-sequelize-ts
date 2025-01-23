import validateData from '@/middlewares/validateData'
import RequestDataType from '@/types/enums/RequestDataType'
import idSchema from '@/zod/IdSchema'

export default class IdValidator {
  static id = validateData(idSchema, RequestDataType.PARAMS)
}
