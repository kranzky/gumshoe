import Status from './world/status.js'
import Room from './world/room.js'
import Item from './world/item.js'
import Location from './world/location.js'

class World {
  constructor (store) {
    this.$store = store
    this.status = new Status(store, 'status')
    // this.player = new Player(store)
    this.location = new Location(store)
    this.room = new Room(store, 'room')
    this.item = new Item(store, 'entity')
    // this.dialogue = new Dialogue(store, 'dialogue')
    // this.quest = new Quest(store, 'quest')
    // this.transcript = new Transcript(store, 'transcript')
  }

  clear () {
    // this.$store.dispatch("page/clear", null, { root: true })
    this.status._clear()
    // this.player.reset()
    this.location._reset()
    this.room._reset()
    this.item._reset()
    // this.dialogue._reset()
    // this.quest._reset()
    // this.transcript._reset()
  }
}

export default World
