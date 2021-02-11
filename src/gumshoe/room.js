import Entity from './entity.js'

class Room extends Entity {
  constructor (name) {
    super(name)
  }

  render (store) {
    store.clear('room')
    store.set("room", "title", this.name)
    store.set("page", "title", this.name)
  }
}

export default Room
