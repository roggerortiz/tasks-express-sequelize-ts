import UtilsHelper from '@/helpers/UtilsHelper'
import { CreateTask, Task, UpdateTask } from '@/types/models/Task'
import TaskModel from '../models/TaskModel'

export default class TaskService {
  static async findAll(): Promise<Task[]> {
    const documents: TaskModel[] = await TaskModel.findAll()
    return documents.map((document: TaskModel) => document.toJSON())
  }

  static async findById(id: number): Promise<Task | null> {
    const document: TaskModel | null = await TaskModel.findByPk(id)
    return document?.toJSON() || null
  }

  static async create(data: CreateTask): Promise<Task | null> {
    const slug: string = UtilsHelper.slugify(data.title) ?? ''
    const document: TaskModel | null = await TaskModel.create({ ...data, slug })
    return document?.toJSON() || null
  }

  static async update(id: number, data: UpdateTask): Promise<Task | null> {
    const slug: string = UtilsHelper.slugify(data.title) ?? ''
    const document: TaskModel | null = await TaskModel.findByPk(id)
    await document?.update({ ...data, slug })
    await document?.save()
    return document?.toJSON() || null
  }

  static async delete(id: number): Promise<Task | null> {
    const document: TaskModel | null = await TaskModel.findByPk(id)
    await document?.destroy()
    return document?.toJSON() || null
  }
}
