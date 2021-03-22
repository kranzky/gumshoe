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

  addCrumb (crumbs, scenario) {
    if (!_.isNull(this.containerId)) {
      crumbs.push(scenario.items[this.containerId])
      _.last(crumbs).addCrumb(crumbs, scenario)
    } else {
      if (!_.isNull(this.botId)) {
        crumbs.push(scenario.bots[this.botId])
        crumbs.push(scenario.rooms[_.last(crumbs).roomId])
      } else if (this.carried) {
        crumbs.push(scenario.rooms[scenario.currentRoom])
      } else {
        crumbs.push(scenario.rooms[this.roomId])
      }
    }
  }

  render (world, scenario) {
    world.item._clear()
    world.item.setType('item')
    world.item.setTitle(this.name)
    world.item.setSubtitle(this.detail)
    let crumbs = [this]
    this.addCrumb(crumbs, scenario)
    _.each(_.reverse(crumbs), (item) => {
      world.item.addCrumb(item, this._action(item.type))
    })
    _.each(this.log, (text) => {
      world.item.addText(text)
    })
    _.each([...this.items], (id) => {
      let item = scenario.items[id]
      world.item.addOption(item, 'examine')
    })
    world.item.show()
    return
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

  _action (type) {
    switch (type) {
      case 'room':
        return 'move'
      case 'item':
        return 'examine'
      case 'bot':
        return 'approach'
    }
    return 'unknown'
  }
}

export default Item
