import Status from './world/status.js'
import Room from './world/room.js'

class World {
  constructor (store) {
    this.$store = store
    this.status = new Status(store, 'status')
    this.room = new Room(store, 'room')
    // entity
    // dialogue
    // quest
    // transcript
    // player -> inventory, notes, quests
    // location -> items, characters, exits
  }

  clear () {
    this.$store.dispatch('status/reset')
  }
}

export default World
