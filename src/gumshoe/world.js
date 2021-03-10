import Player from './world/player.js'
import Room from './world/room.js'

class World {
  constructor (store) {
    this.$store = store
    this.player = new Player(store, 'game')
    this.room = new Room(store, 'room')
  }

  clear () {
    this.$store.dispatch('game/reset')
  }
}

export default World
