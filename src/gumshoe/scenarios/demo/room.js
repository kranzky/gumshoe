import Entity from './entity.js'

class Room extends Entity {
  constructor (name, description = null) {
    super(name, 'room')
    this.log = []
    this.exits = new Set()
    this.items = new Set()
    this.bots = new Set()
  }

  render (world, scenario) {
    world.room._clear()
    world.room.setTitle(this.name)
    _.each(this.log, (text) => {
      world.room.addText(text)
    })
    world.location.people._clear()
    _.each([...this.bots], (id) => {
      let bot = scenario.bots[id]
      world.location.people.append({ id: id, name: bot.name, type: 'bot', seen: bot.seen, action: 'talk' })
    })
    world.location.places._clear()
    _.each([...this.exits], (id) => {
      let exit = scenario.rooms[id]
      world.location.places.append({ id: id, name: exit.name, type: 'room', seen: exit.seen, action: 'move' })
    })
    world.room.show()
    world.location.places.show()
    world.location.people.show()
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

  removeItem (item) {
    this.items.delete(item.id)
    item.setRoomId(null)
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
