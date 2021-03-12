import Status from './world/status.js'
import Room from './world/room.js'
import Item from './world/item.js'

class World {
  constructor (store) {
    this.$store = store
    this.status = new Status(store, 'status')
    this.room = new Room(store, 'room')
    this.item = new Item(store, 'entity')
    // quest
    // transcript
    // player -> inventory, notebook, quests
    // location -> places, people, objects
  }

  clear () {
    this.status._clear()
    this.room._reset()
    this.item._reset()
    // store.dispatch("page/clear", null, { root: true })
    // store.dispatch("dialogue/reset", null, { root: true })
    // store.dispatch("dialogueItems/reset", null, { root: true })
    // store.dispatch("dialogueChoices/reset", null, { root: true })
    // store.dispatch("quest/reset", null, { root: true })
    // store.dispatch("questItems/reset", null, { root: true })
    // store.dispatch("transcript/reset", null, { root: true })
    // store.dispatch("places/reset", null, { root: true })
    // store.dispatch("people/reset", null, { root: true })
    // store.dispatch("objects/reset", null, { root: true })
    // store.dispatch("inventory/reset", null, { root: true })
    // store.dispatch("notebook/reset", null, { root: true })
    // store.dispatch("quests/reset", null, { root: true })
  }
}

export default World
