import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Container from 'App/Models/Container'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs: null})
  public container_id: number

  @column()
  public image_name: string

  @column()
  public image_path: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Container)
  public container: BelongsTo<typeof Container>
}
