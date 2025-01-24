import { sequelize } from '@/database'
import UtilsHelper from '@/helpers/UtilsHelper'
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
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        this.setDataValue('slug', UtilsHelper.slugify(value))
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    important: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

TaskModel.belongsTo(UserModel, { foreignKey: 'user_id' })
UserModel.hasMany(TaskModel, { foreignKey: 'user_id' })

export default TaskModel
