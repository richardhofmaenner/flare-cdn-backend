import { EventsList } from '@ioc:Adonis/Core/Event'
import Env from '@ioc:Adonis/Core/Env'
const OVHStorage = require('node-ovh-objectstorage')

export default class Image {
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

  public async created (params: EventsList['image:created']) {
    await this.storage.connection()
  }

  public async deleted (params: EventsList['image:deleted']) {
    await this.storage.connection()
  }
}
