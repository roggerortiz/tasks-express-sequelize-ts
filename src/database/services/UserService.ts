import PasswordHelper from '@/helpers/PasswordHelper'
import { CreateUser, UpdateUser, User } from '@/types/models/User'
import UserModel from '../models/UserModel'

export default class UserService {
  static async count(filters?: any): Promise<number> {
    const count = await UserModel.count({ where: filters })
    return count
  }

  static async login(username: string, password: string): Promise<User | null> {
    const document: UserModel | null = await UserModel.findOne({ where: { username } })
    const matched: boolean = document ? await PasswordHelper.compare(password, document.password) : false
    const user: User | null = document?.toJSON() || null

    if (!user || !matched) {
      return null
    }

    Reflect.deleteProperty(user, 'password')
    return user
  }

  static async create(data: CreateUser): Promise<User | null> {
    const document: UserModel | null = await UserModel.create({ ...data })
    const user: User | null = document?.toJSON() || null

    if (!user) {
      return null
    }

    Reflect.deleteProperty(user, 'password')
    return user
  }

  static async update(id: number, data: UpdateUser): Promise<User | null> {
    const document: UserModel | null = await UserModel.findByPk(id)
    await document?.update({ ...data })
    await document?.save()
    const user: User | null = document?.toJSON() || null

    if (!user) {
      return null
    }

    Reflect.deleteProperty(user, 'password')
    return user
  }
}
