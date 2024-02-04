import { loginValidator, registerValidator } from '#validators/auth_validator'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserRepository from '../repositories/user_repository.js'
import BadRequestException from '#exceptions/bad_request_exception'
import User from '#models/user'

@inject()
export default class AuthController {
  #userRepository: UserRepository

  constructor(private userRepository: UserRepository) {
    this.#userRepository = userRepository
  }

  public async register({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await registerValidator.validate(data)
    const { email } = payload

    const isEmailUsed = await this.userRepository.findByEmail(email)

    if (isEmailUsed) throw new BadRequestException('Email already used')

    const user = await this.#userRepository.store(payload)

    return response.status(201).json({
      success: true,
      code: 201,
      status: 'Created',
      message: 'User created',
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    })
  }

  public async login({ request, response }: HttpContext) {
    const data = request.all()
    const { email, password } = await loginValidator.validate(data)

    const token = await this.#userRepository.generateToken(email, password)

    return response.status(200).json({
      success: true,
      code: 200,
      status: 'OK',
      message: 'User logged in',
      data: {
        token,
      },
    })
  }

  public async profile({ response, auth }: HttpContext) {
    const user: User = await auth.authenticate()

    return response.status(200).json({
      success: true,
      code: 200,
      status: 'OK',
      message: 'User profile',
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    })
  }
}
