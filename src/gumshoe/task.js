import Entity from './entity.js'
import Trigger from './trigger.js'

class Task extends Entity {
  constructor (name, trigger) {
    super(name, 'task')
    this.trigger = new Trigger(trigger.action, trigger.entity, trigger.room)
    this.complete = false
  }
}

export default Task
