import Entity from './entity.js'

class Item extends Entity {
  constructor (name, description = null) {
    super(name, 'item')
    this.log = []
    this.items = new Set()
    this.roomId = null
    this.containerId = null
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
        let names = []
        _.each([...this.items], (id) => {
          let item = world.items[id]
          names.push(item.name)
          store.add("objects", { id: id, name: item.name, type: 'item', icon: 'label', seen: item.seen })
        })
        if (!_.isEmpty(names)) {
          store.add("entityItems", { text: `Items: ${names.join(', ')}.` })
        }
        store.add("entityChoices", { text: "Start Demo", action: 'demo' })
      })
    }, 500)
  }

  addLog (text) {
    this.log.push(text)
  }

  setRoomId (id) {
    this.roomId = id
  }

  setContainerId (id) {
    this.containerId = id
  }

  addItem (item) {
    this.items.add(item.id)
    item.setContainerId(this.id)
    item.setRoomId(this.room)
  }

  getItems () {
    return this.items
  }
}

export default Item
