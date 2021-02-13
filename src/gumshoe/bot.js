import Entity from './entity.js'

class Bot extends Entity {
  constructor (name, line) {
    super(name, 'bot')
    this.items = new Set()
    this.roomId = null
    this.line = line || "Hello!"
  }

  render (store, world) {
    store.clear('dialogue')
    setTimeout(() => {
      store.add("dialogueItems", { heading: true, label: `Chat with ${this.name}` })
      store.add("dialogueItems", { name: this.name, text: [this.line], time: "Fri 17:38" })
      store.set("page", "title", this.name)
      store.clear('objects')
      setTimeout(() => {
        _.each([...this.items], (id) => {
          let item = world.items[id]
          store.add("objects", { id: id, name: item.name, type: 'item', icon: 'label', seen: item.seen })
        })
        store.add("dialogueChoices", { text: "Start Demo", action: 'demo' })
      })
    }, 500)
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
