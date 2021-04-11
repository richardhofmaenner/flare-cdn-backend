import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/RegisterValidator'
import User from 'App/Models/User'

export default class RegisterController {
  public async store ({request, response}: HttpContextContract) {
    const validatedData = await request.validate(RegisterValidator)

    const newUser = new User()
    newUser.email = validatedData.email
    newUser.password = validatedData.password
    try {
      await newUser.save()
    } catch (e) {
      return response.status(500).json({ error: 'Something went wrong while saving the user.' })
    }

    return response.status(200).json({ success: 'User has been registered.' })
  }
}
