import Entity from './entity.js'

class Bot extends Entity {
  constructor (name, lines) {
    super(name, 'bot')
    this.items = new Set()
    this.roomId = null
    this.lines = lines || ["Hello!"]
  }

  render (store, world) {
    store.clear('dialogue')
    store.add("dialogueItems", { heading: true, label: `Chat with ${this.name}` })
    store.add("dialogueItems", { name: this.name, text: this.lines, time: "Fri 17:38" })
    store.set("page", "title", this.name)
    store.add("dialogueChoices", { text: "Start Demo", action: 'demo' })
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
