import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginRequestValidator from 'App/Validators/LoginRequestValidator'

export default class AuthController {
  public async create ({request, response, auth}: HttpContextContract) {
    const validatedData = await request.validate(LoginRequestValidator)

    const token = await auth.use('api').attempt(validatedData.email, validatedData.password, {
      expiresIn: '10 days',
    })

    return response.status(200).json({ success: 'Successfully logged in.', token: token })
  }

  public async destroy ({auth, response}: HttpContextContract) {
    await auth.logout()

    return response.status(200).json({success: 'Successfully logged out.'})
  }
}
