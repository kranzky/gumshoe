import Entity from './entity.js'

class Room extends Entity {
  constructor (name) {
    super(name)
  }

  render (store) {
    store.clear('room')
    store.set("room", "title", this.name)
    store.set("page", "title", this.name)
    store.add("roomChoices", { text: "Start Demo", action: 'demo' })
  }
}

export default Room
