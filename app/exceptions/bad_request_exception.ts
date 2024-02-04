import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class BadRequestException extends Exception {
  static status = 400
  static code = 'E_BAD_REQUEST'
  static message = 'Bad request'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).json({
      success: false,
      code: error.status,
      status: "Bad Request",
      message: error.message,
    })
  }
}