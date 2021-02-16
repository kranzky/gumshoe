import Entity from './entity.js'

class Trigger extends Entity {
  constructor (action, entity, room) {
    super(action, 'trigger')
    this.entity = entity
    this.room = room
  }

  match (action, entity, room) {
    return this.name == action && this.entity == entity && (_.isEmpty(this.room) || this.room == room)
  }
}

export default Trigger
