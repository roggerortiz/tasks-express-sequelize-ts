import { sequelize } from '@/database'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import UserModel from './UserModel'

class TaskModel extends Model<InferAttributes<TaskModel>, InferCreationAttributes<TaskModel>> {
  declare id: CreationOptional<number>
  declare title: string
  declare slug: string
  declare description: string | null
  declare important: boolean
  declare user_id: number
}

TaskModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    important: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'tasks'
  }
)

TaskModel.belongsTo(UserModel, { foreignKey: 'user_id' })
UserModel.hasMany(TaskModel, { foreignKey: 'user_id' })

export default TaskModel
