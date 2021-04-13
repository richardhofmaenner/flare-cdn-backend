import { EventsList } from '@ioc:Adonis/Core/Event'
import Env from '@ioc:Adonis/Core/Env'
const OVHStorage = require('node-ovh-objectstorage')
const crypto = require('crypto')

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
    await params.image.preload('container')
    const storageFileName = crypto.createHash('md5').update(params.image.$extras.tmpPath).digest('hex')
    const imagePath = `${params.image.container.objectStorageName}/${storageFileName}`
    console.log(params.image.$extras.tmpPath)
    try {
      await this.storage.objects().saveFile(params.image.$extras.tmpPath, imagePath)
    } catch (e) {
      throw e
    }

    params.image.image_path = imagePath

    await params.image.save()
  }

  public async deleted (params: EventsList['image:deleted']) {
    await this.storage.connection()
  }
}
