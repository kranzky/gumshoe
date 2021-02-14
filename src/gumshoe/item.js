import Entity from './entity.js'

class Item extends Entity {
  constructor (name, description = null) {
    super(name, 'item')
    this.log = []
    this.items = new Set()
    this.roomId = null
    this.botId = null
    this.containerId = null
  }

  addCrumb (store, world) {
    if (!_.isNull(this.containerId)) {
      let item = world.items[this.containerId]
      store.add("entityCrumbs", { id: item.id, name: item.name, type: item.type })
      item.addCrumb(store, world)
    } else {
      if (!_.isNull(this.botId)) {
        let bot = world.bots[this.botId]
        store.add("entityCrumbs", { id: bot.id, name: bot.name, type: bot.type })
        let room = world.rooms[bot.roomId]
        store.add("entityCrumbs", { id: room.id, name: room.name, type: room.type })
      } else {
        let room = world.rooms[this.roomId]
        store.add("entityCrumbs", { id: room.id, name: room.name, type: room.type })
      }
    }
  }

  render (store, world) {
    store.clear('entity')
    store.set("entity", "title", this.name)
    store.add("entityCrumbs", { id: this.id, name: this.name, type: this.type })
    this.addCrumb(store, world)
    _.each(this.log, (text) => {
      store.add("entityItems", { text: text })
    })
    let names = []
    _.each([...this.items], (id) => {
      let item = world.items[id]
      names.push(item.name)
    })
    if (!_.isEmpty(names)) {
      store.add("entityItems", { text: `Items: ${names.join(', ')}.` })
    }
    store.add("entityChoices", { text: "Start Demo", action: 'demo' })
  }

  addLog (text) {
    this.log.push(text)
  }

  setRoomId (id) {
    this.roomId = id
  }

  setBotId (id) {
    this.botId = id
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
