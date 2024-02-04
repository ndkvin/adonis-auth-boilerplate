import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    full_name: vine.string().maxLength(255),
    email: vine.string().email(),
    password: vine.string().minLength(8),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
  })
)

