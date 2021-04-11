import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {AuthenticationException} from '@adonisjs/auth/build/standalone'

export default class IsGuest {
  public async handle ({auth}: HttpContextContract, next: () => Promise<void>) {
    if (await auth.check()) {
      throw new AuthenticationException(
        'You are not allowed here as logged in user',
        'E_UNAUTHORIZED_ACCESS'
      )
    }
    await next()
  }
}
