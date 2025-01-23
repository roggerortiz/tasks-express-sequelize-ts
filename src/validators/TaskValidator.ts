import validateData from '@/middlewares/validateData'
import RequestDataType from '@/types/enums/RequestDataType'
import saveTaskSchema from '@/zod/SaveTaskSchema'

export default class TaskValidator {
  static saveTask = validateData(saveTaskSchema, RequestDataType.BODY)
}
