import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ContainerCreateRequestValidator from 'App/Validators/ContainerCreateRequestValidator'
import Container from 'App/Models/Container'
import {validator} from '@ioc:Adonis/Core/Validator'
import ContainerIdExistValidator from 'App/Validators/ContainerIdExistValidator'
import BelongsNotToUserException from 'App/Exceptions/BelongsNotToUserException'

export default class ContainersController {
  public async index ({auth, response}: HttpContextContract) {
    const user = <User> await auth.user
    await user.preload('containers')

    return response.status(200).json({data: user.containers})
  }

  public async create ({request, auth, response}: HttpContextContract) {
    const validatedData = await request.validate(ContainerCreateRequestValidator)

    const user = <User> await auth.user

    const newContainer = new Container()
    newContainer.name = validatedData.name
    await newContainer.related('user').associate(user)

    try {
      await newContainer.save()
    } catch (e) {
      return response.status(500).json({error: 'Something went wrong while creating the new controller.'})
    }

    return response.status(201).json({ success: 'Successfully created the container.', data: newContainer})
  }

  public async show ({auth, response, params }: HttpContextContract) {
    const validatedParams = await validator.validate({
      schema: ContainerIdExistValidator.schema,
      data: params,
    })

    const user = <User> await auth.user

    const container = await Container.findOrFail(validatedParams.id)
    await container.preload('user')

    if (container.userId === user.id) {
      return response.status(200).json({data: container})
    } else {
      throw new BelongsNotToUserException('This container does not belong to you.')
    }
  }

  public async update ({request, auth, response, params}: HttpContextContract) {
    const validatedParams = await validator.validate({
      schema: ContainerIdExistValidator.schema,
      data: params,
    })

    const user = <User> await auth.user

    const container = await Container.findOrFail(validatedParams.id)

    if (container.userId !== user.id) {
      throw new BelongsNotToUserException()
    }

    const validatedData = await request.validate(ContainerCreateRequestValidator)

    container.name = validatedData.name

    await container.save()

    return response.status(200).json({success: 'Container successfully updated.', data: container})
  }

  public async destroy ({auth, response, params }: HttpContextContract) {
    const validatedParams = await validator.validate({
      schema: ContainerIdExistValidator.schema,
      data: params,
    })

    const user = <User> await auth.user

    const container = await Container.findOrFail(validatedParams.id)

    if (container.userId === user.id) {
      await container.delete()

      return response.status(200).json({ success: 'Successfully deleted container.' })
    } else {
      throw new BelongsNotToUserException()
    }
  }
}
