import SequelizeHelper from '@/helpers/SequelizeHelper'
import { CreateTask, Task, UpdateTask } from '@/types/models/Task'
import Pager from '@/types/pagination/Pager'
import Paging from '@/types/pagination/Paging'
import { GetTasks } from '@/types/request/GetTasks'
import BaseModel from '../models/BaseModel'
import TaskModel from '../models/TaskModel'

export default class TaskService {
  static async findAll(pager: Pager, params: GetTasks): Promise<Paging<Task>> {
    const { offset, limit, order, where } = SequelizeHelper.aggregate(pager, params, ['title', 'description'])
    const { count, rows } = await TaskModel.findAndCountAll({ offset, limit, order, where })
    return BaseModel.paginate<TaskModel, Task>(pager, count, rows)
  }

  static async findById(id: number): Promise<Task | null> {
    const document: TaskModel | null = await TaskModel.findByPk(id)
    return BaseModel.toJSON<TaskModel, Task>(document)
  }

  static async create(data: CreateTask): Promise<Task | null> {
    const document: TaskModel | null = await TaskModel.create({ ...data, slug: data.title })
    return BaseModel.toJSON<TaskModel, Task>(document)
  }

  static async update(id: number, data: UpdateTask): Promise<Task | null> {
    const document: TaskModel | null = await TaskModel.findByPk(id)
    await document?.update({ ...data, slug: data.title })
    await document?.save()
    return BaseModel.toJSON<TaskModel, Task>(document)
  }

  static async delete(id: number): Promise<boolean> {
    const count: number = await TaskModel.destroy({ where: { id } })
    return count > 0
  }
}
