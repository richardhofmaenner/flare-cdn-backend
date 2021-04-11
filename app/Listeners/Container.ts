import { EventsList } from '@ioc:Adonis/Core/Event'
import Env from '@ioc:Adonis/Core/Env'
const OVHStorage = require('node-ovh-objectstorage')

export default class Container {
  private storage

  constructor () {
    this.storage = new OVHStorage({
      username: Env.get('OVH_OPENSTACK_USER'),
      password: Env.get('OVH_OPENSTACK_PASSWORD'),
      authURL: Env.get('OVH_OPENSTACK_AUTH_URL'),
      tenantId: Env.get('OVH_OPENSTACK_TENANT_ID'),
      region: Env.get('OVH_OPENSTACK_REGION'),
    })
  }

  public async created (params: EventsList['container:created']) {
    await this.storage.connection()
    await this.storage.containers().create(params.container.objectStorageName)
  }

  public async deleted (params: EventsList['container:deleted']) {
    await this.storage.connection()
    await this.storage.containers().delete(params.container.objectStorageName)
  }
}
