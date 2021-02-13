import Entity from './entity.js'

class Room extends Entity {
  constructor (name, description = null) {
    super(name, 'room')
    this.log = []
    this.exits = new Set()
    this.items = new Set()
    this.bots = new Set()
  }

  render (store, world) {
    store.clear('room')
    store.set("room", "title", this.name)
    store.set("page", "title", this.name)
    _.each(this.log, (text) => {
      store.add("roomItems", { text: text })
    })
    store.clear('people')
    store.clear('places')
    let names = []
    _.each([...this.bots], (id) => {
      let bot = world.bots[id]
      names.push(bot.name)
      store.add("people", { id: id, name: bot.name, type: 'bot', icon: 'face', seen: bot.seen })
    })
    if (!_.isEmpty(names)) {
      store.add("roomItems", { text: `NPCs: ${names.join(', ')}.` })
    }
    names = []
    _.each([...this.items], (id) => {
      let item = world.items[id]
      names.push(item.name)
    })
    if (!_.isEmpty(names)) {
      store.add("roomItems", { text: `Items: ${names.join(', ')}.` })
    }
    names = []
    _.each([...this.exits], (id) => {
      let exit = world.rooms[id]
      names.push(exit.name)
      store.add("places", { id: id, name: exit.name, type: 'room', icon: 'place', seen: exit.seen })
    })
    if (!_.isEmpty(names)) {
      store.add("roomItems", { text: `Exits: ${names.join(', ')}.` })
    }
    store.add("roomChoices", { text: "Start Demo", action: 'demo' })
  }

  addLog (text) {
    this.log.push(text)
  }

  addExit (room) {
    this.exits.add(room.id)
    room.exits.add(this.id)
  }

  addItem (item) {
    this.items.add(item.id)
    item.setRoomId(this.id)
  }

  addBot (bot) {
    this.bots.add(bot.id)
    bot.setRoomId(this.id)
  }

  getRooms () {
    return this.rooms
  }

  getItems () {
    return this.items
  }

  getBots () {
    return this.bots
  }
}

export default Room
