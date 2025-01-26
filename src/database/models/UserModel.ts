import PasswordHelper from '@/helpers/PasswordHelper'
import { sequelize } from '@/helpers/SequelizeHelper'
import DatabaseField from '@/types/enums/DatabaseField'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare id: CreationOptional<number>
  declare first_name: string
  declare last_name: string
  declare email: string
  declare phone: string
  declare username: string
  declare password: string
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        exists: async (value: string) => {
          const count: number = await UserModel.count({ where: { email: value } })

          if (count) {
            throw new Error("The 'Email' value already exists")
          }
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        exists: async (value: string) => {
          const count: number = await UserModel.count({ where: { phone: value } })

          if (count) {
            throw new Error("The 'Phone' value already exists")
          }
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        exists: async (value: string) => {
          const count: number = await UserModel.count({ where: { username: value } })

          if (count) {
            throw new Error("The 'Username' value already exists")
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        this.setDataValue('password', PasswordHelper.hash(value))
      }
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    createdAt: DatabaseField.CREATED_AT,
    updatedAt: DatabaseField.UPDATED_AT
  }
)

export default UserModel
