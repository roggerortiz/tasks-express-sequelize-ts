import PasswordHelper from '@/helpers/PasswordHelper'
import { CreateUser, UpdateUser, User } from '@/types/models/User'
import BaseModel from '../models/BaseModel'
import UserModel from '../models/UserModel'

export default class UserService {
  static async login(username: string, password: string): Promise<User | null> {
    const document: UserModel | null = await UserModel.findOne({ where: { username } })
    const matched: boolean = document ? await PasswordHelper.compare(password, document.password) : false
    return matched ? BaseModel.toJSON<UserModel, User>(document, ['password']) : null
  }

  static async create(data: CreateUser): Promise<User | null> {
    const document: UserModel | null = await UserModel.create({ ...data })
    return BaseModel.toJSON<UserModel, User>(document, ['password'])
  }

  static async update(id: number, data: UpdateUser): Promise<User | null> {
    const document: UserModel | null = await UserModel.findByPk(id)
    await document?.update({ ...data })
    await document?.save()
    return BaseModel.toJSON<UserModel, User>(document, ['password'])
  }
}
