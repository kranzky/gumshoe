import Entity from './entity.js'

class Quest extends Entity {
  show () {
    this._show()
  }

  setTitle (title) {
    this._set('title', title)
  }

  setDescription (description) {
    this._set('description', description)
  }

  addTask (name, done) {
    if (_.isUndefined(done)) {
      done = false
    }
    this._append({ name: name, done: done })
  }
}

export default Quest
