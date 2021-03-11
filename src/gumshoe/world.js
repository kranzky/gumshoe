import Status from './world/status.js'
import Room from './world/room.js'

class World {
  constructor (store) {
    this.$store = store
    // TODO: rename to this.status
    this.status = new Status(store, 'game')
    this.room = new Room(store, 'room')
    // TODO: add remaining objects:
    // item
    // chat
    // task
    // player -> inventory, notes, quests
    // location -> items, characters, exits
  }

  clear () {
    this.$store.dispatch('game/reset')
  }
}

export default World
