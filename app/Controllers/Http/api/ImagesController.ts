import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ImageCreateRequestValidator from 'App/Validators/ImageCreateRequestValidator'
import {validator} from '@ioc:Adonis/Core/Validator'
import ContainerIdExistValidator from 'App/Validators/ContainerIdExistValidator'
import Container from 'App/Models/Container'
import User from 'App/Models/User'
import BelongsNotToUserException from 'App/Exceptions/BelongsNotToUserException'
import Image from 'App/Models/Image'
const fs = require('fs')
import Application from '@ioc:Adonis/Core/Application'

export default class ImagesController {
  public async create ({request, auth, params, response}: HttpContextContract) {
    const validatedData = await request.validate(ImageCreateRequestValidator)
    const validatedParams = await validator.validate({
      data: params,
      schema: ContainerIdExistValidator.schema,
    })

    const container = await Container.findOrFail(validatedParams.id)
    const user = <User> await auth.user

    if (container.userId === user.id) {
      const newImage = new Image()
      const currentTimestamp = Math.floor(new Date().getTime() / 1000)
      const localTmpPath = Application.tmpPath(`images/${currentTimestamp}_${validatedData.name}`)
      const replacedImageString = validatedData.image.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = new Buffer(replacedImageString, 'base64')

      fs.writeFileSync(localTmpPath, imageBuffer)

      newImage.image_name = validatedData.name
      newImage.$extras.tmpPath = localTmpPath
      await newImage.related('container').associate(container)
      await newImage.save()
    } else {
      throw new BelongsNotToUserException()
    }

    return response.status(200)
  }

  public async show ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
