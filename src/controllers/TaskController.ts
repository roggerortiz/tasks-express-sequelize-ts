import TaskService from '@/database/services/TaskService'
import UtilsHelper from '@/helpers/UtilsHelper'
import ResponseStatus from '@/types/enums/ResponseStatus'
import NotFoundError from '@/types/errors/NotFoundError'
import { CreateTask, Task, UpdateTask } from '@/types/models/Task'
import { Request } from '@/types/requests/Request'
import { NextFunction, Response } from 'express'

export default class TaskController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await TaskService.findAll()
      res.status(ResponseStatus.SUCCESS).json(tasks)
    } catch (error) {
      next(error)
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const task = await TaskService.findById(id)

      if (!task) {
        throw new NotFoundError()
      }

      res.status(ResponseStatus.SUCCESS).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateTask = {
        title: req.body.title,
        slug: UtilsHelper.slugify(req.body.title) ?? '',
        description: req.body.description,
        important: req.body.important,
        user_id: req.user?.id ? Number(req.user?.id) : 0
      }
      const task: Task | null = await TaskService.create(data)
      res.status(ResponseStatus.CREATED).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const data: UpdateTask = {
        title: req.body.title,
        slug: UtilsHelper.slugify(req.body.title),
        description: req.body.description,
        important: req.body.important
      }
      const task: Task | null = await TaskService.update(id, data)

      if (!task) {
        throw new NotFoundError()
      }

      res.status(ResponseStatus.SUCCESS).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const task = await TaskService.delete(id)

      if (!task) {
        throw new NotFoundError()
      }

      res.status(ResponseStatus.SUCCESS).json(task)
    } catch (error) {
      next(error)
    }
  }
}
