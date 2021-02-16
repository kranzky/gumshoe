import Entity from './entity.js'
import Task from './task.js'

class Quest extends Entity {
  constructor (name, description, trigger, tasks) {
    super(name, 'quest')
    this.description = description
    this.tasks = []
    _.each(tasks, (task) => {
      this.tasks.push(new Task(task.name, task.trigger))
    })
    this.active = false
    this.complete = false
  }

  update (world) {
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
