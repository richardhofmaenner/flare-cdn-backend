import Event from '@ioc:Adonis/Core/Event'

Event.on('container:created', 'Container.created')
Event.on('container:deleted', 'Container.deleted')
