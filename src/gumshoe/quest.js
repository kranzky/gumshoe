import Entity from './entity.js'
import Task from './task.js'
import Trigger from './trigger.js'

class Quest extends Entity {
  constructor (name, description, trigger, tasks) {
    super(name, 'quest')
    this.description = description
    this.trigger = new Trigger(trigger.action, trigger.entity, trigger.room)
    this.tasks = []
    _.each(tasks, (task) => {
      this.tasks.push(new Task(task.name, task.trigger))
    })
    this.active = false
    this.complete = false
  }

  update (action, entity, room) {
    if (!this.active) {
      this.active = this.trigger.match(action, entity, room)
    } else {
      this.complete = true
      _.each(this.tasks, (task) => {
        if (!task.complete) {
          task.complete = task.trigger.match(action, entity, room)
        }
        this.complete = this.complete && task.complete
      })
    }
  }

  render (store, world) {
    store.clear('quest')
    store.set("quest", "title", this.name)
    store.set("quest", "description", this.description)
    _.each(this.tasks, (task) => {
      store.add("questItems", { name: task.name, done: task.complete })
    })
  }
}

export default Quest
