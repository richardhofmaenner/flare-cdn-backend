import { DateTime } from 'luxon'
import {BaseModel, belongsTo, column, BelongsTo, afterCreate, computed, afterDelete} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Event from '@ioc:Adonis/Core/Event'

export default class Container extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({serializeAs: null})
  public userId: number

  @belongsTo(() => User, { serializeAs: null })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @afterCreate()
  public static async emitCreateEvent (container: Container) {
    Event.emit('container:created', {container}).then()
  }

  @afterDelete()
  public static async emitDeleteEvent (container: Container) {
    Event.emit('container:deleted', { container }).then()
  }
  @computed()
  public get objectStorageName () {
    return `${this.id}_${this.userId}`
  }
}
