export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string | null
  username: string
  password: string
}

export type CreateUser = Omit<User, 'id'>

export type UpdateUser = Partial<CreateUser>
