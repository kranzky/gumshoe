import Entity from './entity.js'

class Room extends Entity {
  constructor (name, description = null) {
    super(name, 'room')
    this.log = []
    this.exits = new Set()
    this.items = new Set()
    this.bots = new Set()
  }

  render (store, world) {
    store.clear('room')
    setTimeout(() => {
      store.set("room", "title", this.name)
      store.set("page", "title", this.name)
      _.each(this.log, (text) => {
        store.add("roomItems", { text: text })
      })
      store.clear('people')
      store.clear('objects')
      store.clear('places')
      setTimeout(() => {
        store.add("roomChoices", { text: "Start Demo", action: 'demo' })
        _.each([...this.exits], (id) => {
          let exit = world.rooms[id]
          store.add("places", { id: id, name: exit.name, type: 'room', icon: 'place' })
        })
      })
    }, 500)
  }

  addLog (text) {
    this.log.push(text)
  }

  addExit (other) {
    this.exits.add(other.id)
    other.exits.add(this.id)
  }

  getRooms () {
    return this.rooms
  }

  getItems () {
    return this.items
  }

  getBots () {
    return this.bots
  }
}

export default Room
