import PasswordHelper from '@/helpers/PasswordHelper'
import { CreateUser, User } from '@/types/models/User'
import UserModel from '../models/UserModel'

export default class UserService {
  static async login(username: string, password: string): Promise<User | null> {
    const document: UserModel | null = await UserModel.findOne({ where: { username } })
    const user: User | null = document?.toJSON() || null
    const result: boolean = user ? await PasswordHelper.compare(password, user.password) : false

    if (!user || !result) {
      return null
    }

    Reflect.deleteProperty(user, 'password')
    return user
  }

  static async signup(data: CreateUser): Promise<User | null> {
    const document: UserModel | null = await UserModel.create({ ...data })
    const user: User | null = document?.toJSON() || null

    if (!user) {
      return null
    }

    Reflect.deleteProperty(user, 'password')
    return user
  }
}
