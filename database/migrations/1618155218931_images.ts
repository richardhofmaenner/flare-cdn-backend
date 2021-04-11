import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Images extends BaseSchema {
  protected tableName = 'images'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('container_id')
      table.string('image_name')
      table.string('image_path')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
