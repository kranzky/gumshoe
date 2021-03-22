import Entity from './entity.js'

class Bot extends Entity {
  constructor (name, description, lines) {
    super(name, 'bot')
    this.items = new Set()
    this.roomId = null
    this.description = description
    this.lines = lines || ["Hello!"]
  }

  render (store, world) {
    store.clear('dialogue')
    store.add("dialogueItems", { heading: true, label: `Chat with ${this.name}` })
    store.add("dialogueItems", { name: this.name, text: this.lines, time: "Fri 17:38" })
  }

  // TODO: detect if we are already displaying this entity
  render_entity (world, scenario) {
    world.item._clear()
    world.item.setType('bot')
    world.item.setTitle(this.name)
    let room = scenario.rooms[this.roomId]
    world.item.addCrumb({ id: room.id, name: room.name, type: room.type }, 'move')
    world.item.addCrumb({ id: this.id, name: this.name, type: this.type })
    world.item.addText(this.description)
    _.each([...this.items], (id) => {
      let item = scenario.items[id]
      world.item.addOption(item, 'examine')
    })
    world.item.show()
  }

  setRoomId (id) {
    this.roomId = id
  }

  addItem (item) {
    this.items.add(item.id)
    item.setBotId(this.id)
    item.setRoomId(this.room)
  }

  removeItem (item) {
    this.items.delete(item.id)
    item.setBotId(null)
    item.setRoomId(null)
  }

  getItems () {
    return this.items
  }
}

export default Bot
