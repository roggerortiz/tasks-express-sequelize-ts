export type Task = {
  id: number
  title: string
  slug: string
  description: string | null
  important: boolean
  user_id: number
}

export type CreateTask = Omit<Task, 'id' | 'slug'>

export type UpdateTask = Omit<Task, 'id' | 'slug' | 'user_id'>
