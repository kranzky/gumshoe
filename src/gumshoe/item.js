import Entity from './entity.js'

class Item extends Entity {
  constructor (name, description = null) {
    super(name, 'item')
    this.log = []
    this.items = new Set()
    this.room = null
  }

  render (store, world) {
    store.clear('entity')
    setTimeout(() => {
      store.set("entity", "title", this.name)
      store.set("page", "title", this.name)
      _.each(this.log, (text) => {
        store.add("entityItems", { text: text })
      })
      store.clear('objects')
      setTimeout(() => {
        _.each([...this.items], (id) => {
          let item = world.item[id]
          store.add("objects", { id: id, name: item.name, type: 'item', icon: 'label', seen: item.seen })
        })
        store.add("entityChoices", { text: "Start Demo", action: 'demo' })
      })
    }, 500)
  }

  addLog (text) {
    this.log.push(text)
  }

  setRoom (room) {
    this.room = room.id
  }

  getItems () {
    return this.items
  }
}

export default Item
