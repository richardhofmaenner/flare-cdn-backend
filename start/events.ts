import Event from '@ioc:Adonis/Core/Event'

Event.on('container:created', 'Container.created')
Event.on('container:deleted', 'Container.deleted')

Event.on('image:created', 'Image.created')
Event.on('image:deleted', 'Image.deleted')
