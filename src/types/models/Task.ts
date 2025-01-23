export type Task = {
  id: number
  title: string
  slug: string
  description: string | null
  important: boolean
  user_id: number
}

export type CreateTask = Omit<Task, 'id'>

export type UpdateTask = Partial<Omit<CreateTask, 'user_id'>>
