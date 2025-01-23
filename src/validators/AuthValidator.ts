import validateData from '@/middlewares/validateData'
import RequestDataType from '@/types/enums/RequestDataType'
import loginSchema from '@/zod/LoginSchema'
import signupSchema from '@/zod/SignupSchema'

export default class AuthValidator {
  static login = validateData(loginSchema, RequestDataType.BODY)
  static signup = validateData(signupSchema, RequestDataType.BODY)
}
