import Entity from './entity.js'
import Task from './task.js'
import Trigger from './trigger.js'

class Quest extends Entity {
  constructor (name, description, success, trigger, tasks) {
    super(name, 'quest')
    this.description = description
    this.success = success
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
      if (this.active) {
        window.game.triggerQuestStart(this.name, this.description)
      }
    } else if (!this.complete) {
      this.complete = true
      _.each(this.tasks, (task) => {
        if (!task.complete) {
          task.complete = task.trigger.match(action, entity, room)
          if (task.complete) {
            window.game.triggerTask(task.name)
            this.seen = false
          }
        }
        this.complete = this.complete && task.complete
      })
      if (this.complete) {
        room.addLog(this.success)
        room.seen = false
        window.game.triggerQuestDone(this.name, this.success, entity)
      }
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
