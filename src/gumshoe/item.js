import Entity from './entity.js'

class Item extends Entity {
  constructor (name, canGet, canPut, prep) {
    super(name, 'item')
    this.log = []
    this.items = new Set()
    this.roomId = null
    this.botId = null
    this.containerId = null
    this.canGet = canGet
    this.canPut = canPut
    this.prep = prep
    this.carried = false
    this.detail = null
  }

  addCrumb (crumbs, store, world) {
    if (!_.isNull(this.containerId)) {
      crumbs.push(world.items[this.containerId])
      _.last(crumbs).addCrumb(crumbs, store, world)
    } else {
      if (!_.isNull(this.botId)) {
        crumbs.push(world.bots[this.botId])
        crumbs.push(world.rooms[_.last(crumbs).roomId])
      } else if (this.carried) {
        crumbs.push(world.rooms[world.currentRoom])
      } else {
        crumbs.push(world.rooms[this.roomId])
      }
    }
  }

  render (store, world) {
    store.clear('entity')
    store.set("entity", "title", this.name)
    store.set("entity", "subtitle", this.detail)
    let crumbs = [this]
    this.addCrumb(crumbs, store, world)
    _.each(_.reverse(crumbs), (item) => {
      store.add("entityCrumbs", { id: item.id, name: item.name, type: item.type })
    })
    _.each(this.log, (text) => {
      store.add("entityItems", { text: text })
    })
    if (!this.carried) {
      if (this.canGet) {
        store.add("entityChoices", { text: `Take the ${this.name}`, action: 'take' })
      }
      if (this.canPut) {
        // list all carried items
      }
    } else {
      store.add("entityChoices", { text: `Drop the ${this.name}`, action: 'drop' })
    }
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

  removeItem (item) {
    this.items.delete(item.id)
    item.setContainerId(null)
    item.setRoomId(null)
  }

  getItems () {
    return this.items
  }
}

export default Item
