import pluralize from 'pluralize'
import converter from 'number-to-words'
import { _ } from 'core-js'
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
    world.room.setType('room')
    world.room.setId(this.id)
    world.room.setTitle(this.name)
    _.each(this.log, (text) => {
      world.room.addText(text)
    })
    world.location.people._clear()
    _.each([...this.bots], (id) => {
      this._append(world.location.people, scenario.bots[id], { action: 'approach' })
    })
    world.location.places._clear()
    _.each([...this.exits], (id) => {
      this._append(world.location.places, scenario.rooms[id], { action: 'move' })
    })
    world.location.objects._clear()
    _.each([...this.items], (id) => {
      this._append(world.location.objects, scenario.items[id], { action: 'examine' })
    })
    this._renderOption(world, this.exits, 'room', 'Exit')
    this._renderOption(world, this.bots, 'bot', 'NPC')
    this._renderOption(world, this.items, 'item', 'Item')
    world.room.addChoice('Wait...', 'wait', {})
    world.room.show()
    world.location.places.show()
    world.location.people.show()
    world.location.objects.show()
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

  _append (list, data, options) {
    list.append(_.merge(options || {}, _.pick(data, ['id', 'name', 'type', 'seen'])))
  }

  _renderOption (world, list, icon, name, data) {
    if (list.size == 0) {
      return
    }
    name = `${_.capitalize(converter.toWords(list.size))} ${pluralize(name, list.size)}`
    world.room.addOption(icon, name, 'focus', data)
  }
}

export default Room
