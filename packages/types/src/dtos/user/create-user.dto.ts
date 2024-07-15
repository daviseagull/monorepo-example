import { z } from 'zod'

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>

export const CreateUserDtoSchema = z.object({
  first: z
    .string()
    .transform(
      (data) => data.charAt(0).toUpperCase() + data.substring(1).toLowerCase()
    ),
  last: z
    .string()
    .transform(
      (data) => data.charAt(0).toUpperCase() + data.substring(1).toLowerCase()
    ),
})
