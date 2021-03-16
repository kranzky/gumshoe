import Status from './world/status.js'
import Location from './world/location.js'
import Player from './world/player.js'
import Transcript from './world/transcript.js'
import Room from './world/room.js'
import Item from './world/item.js'
import Dialogue from './world/dialogue.js'
import Quest from './world/quest.js'

class World {
  constructor (root, store) {
    this.$root = root
    this.$store = store
    this.status = new Status(store, 'status')
    this.location = new Location(store)
    this.player = new Player(store)
    this.transcript = new Transcript(store, 'transcript')
    this.room = new Room(store, 'room')
    this.item = new Item(store, 'entity')
    this.dialogue = new Dialogue(store, 'dialogue')
    this.quest = new Quest(store, 'quest')
  }

  clear () {
    // this.$store.dispatch("page/clear", null, { root: true })
    this.status._clear()
    this.location._reset()
    this.player._reset()
    this.transcript._reset()
    this.room._reset()
    this.item._reset()
    this.dialogue._reset()
    this.quest._reset()
  }

  notify (message) {
    this.$root.$emit("punk:info", message)
  }
}

export default World
