import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Containers extends BaseSchema {
  protected tableName = 'containers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.bigInteger('user_id')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
