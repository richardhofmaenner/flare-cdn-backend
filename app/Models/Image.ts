import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Container from 'App/Models/Container'
import {beforeCreate} from '@adonisjs/lucid/build/src/Orm/Decorators'
import Event from '@ioc:Adonis/Core/Event'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs: null})
  public containerId: number

  @column()
  public image_name: string

  @column({})
  public image_path: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Container)
  public container: BelongsTo<typeof Container>

  @beforeCreate()
  public static async emitBeforeCreatedEvent (image: Image) {
    Event.emit('image:created', {image}).then()
  }
}
