import { Sequelize } from 'sequelize'
import SequelizeHelper from './helpers/SequelizeHelper'

export const sequelize: Sequelize = SequelizeHelper.connection()

export const connectDB = async () => {
  await sequelize.authenticate()
  // await sequelize.sync({ force: true })
}
