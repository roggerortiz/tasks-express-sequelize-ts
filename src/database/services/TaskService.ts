import SequelizeHelper from '@/helpers/SequelizeHelper'
import { CreateTask, Task, UpdateTask } from '@/types/models/Task'
import Pager from '@/types/pagination/Pager'
import Paging from '@/types/pagination/Paging'
import { GetTasks } from '@/types/requests/GetTasks'
import TaskModel from '../models/TaskModel'

export default class TaskService {
  static async findAll(pager: Pager, params: GetTasks): Promise<Paging<Task>> {
    const { offset, limit, order, where } = SequelizeHelper.aggregate(pager, params, ['title', 'description'])
    const total_items: number = await TaskModel.count({ where })
    const documents: TaskModel[] = await TaskModel.findAll({ offset, limit, order, where })
    const paging: Paging<Task> = SequelizeHelper.paginate(documents, pager, total_items)
    return paging
  }

  static async findById(id: number): Promise<Task | null> {
    const document: TaskModel | null = await TaskModel.findByPk(id)
    return document?.toJSON() || null
  }

  static async create(data: CreateTask): Promise<Task | null> {
    const document: TaskModel | null = await TaskModel.create({ ...data, slug: data.title })
    return document?.toJSON() || null
  }

  static async update(id: number, data: UpdateTask): Promise<Task | null> {
    const document: TaskModel | null = await TaskModel.findByPk(id)
    await document?.update({ ...data, slug: data.title })
    await document?.save()
    return document?.toJSON() || null
  }

  static async delete(id: number): Promise<Task | null> {
    const document: TaskModel | null = await TaskModel.findByPk(id)
    await document?.destroy()
    return document?.toJSON() || null
  }
}
