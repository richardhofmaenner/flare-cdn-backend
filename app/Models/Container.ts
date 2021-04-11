import { DateTime } from 'luxon'
import {BaseModel, belongsTo, column, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

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
}
