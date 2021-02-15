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

  render_entity (store, world) {
    store.clear('entity')
    store.set("entity", "title", this.name)
    let room = world.rooms[this.roomId]
    store.add("entityCrumbs", { id: room.id, name: room.name, type: room.type })
    store.add("entityCrumbs", { id: this.id, name: this.name, type: this.type })
    store.add("entityItems", { text: this.description })
    store.add("entityChoices", { text: `Talk to ${this.name}`, action: 'talk' })
  }

  setRoomId (id) {
    this.roomId = id
  }

  addItem (item) {
    this.items.add(item.id)
    item.setBotId(this.id)
    item.setRoomId(this.room)
  }

  getItems () {
    return this.items
  }
}

export default Bot
