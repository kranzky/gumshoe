import Entity from './entity.js'

class Task extends Entity {
  constructor (name, trigger) {
    super(name, 'task')
    this.trigger = trigger
    this.complete = false
  }

  update (world) {
  }
}

export default Task
