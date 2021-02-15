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

  addCrumb (crumbs, store, world) {
    if (!_.isNull(this.containerId)) {
      crumbs.push(world.items[this.containerId])
      _.last(crumbs).addCrumb(crumbs, store, world)
    } else {
      if (!_.isNull(this.botId)) {
        crumbs.push(world.bots[this.botId])
        crumbs.push(world.rooms[_.last(crumbs).roomId])
      } else {
        crumbs.push(world.rooms[this.roomId])
      }
    }
  }

  render (store, world) {
    store.clear('entity')
    store.set("entity", "title", this.name)
    let crumbs = [this]
    this.addCrumb(crumbs, store, world)
    _.each(_.reverse(crumbs), (item) => {
      store.add("entityCrumbs", { id: item.id, name: item.name, type: item.type })
    })
    _.each(this.log, (text) => {
      store.add("entityItems", { text: text })
    })
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
