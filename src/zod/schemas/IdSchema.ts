import validator from 'validator'
import { z } from 'zod'

const idSchema = z.object({
  id: z
    .string({ message: "The 'ID' field is required" })
    .refine((value) => validator.isInt(value), "The 'ID' field must be a integer")
})

export default idSchema
