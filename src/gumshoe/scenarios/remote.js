import { LocalStorage, SessionStorage } from 'quasar'
import Dexie from 'dexie'

// store player id and current room, item, bot etc in localstorage
// exits have name, origin id and destination id
// send actions to the server
// server returns events that mutate state
// render current state to the store

class Remote {
  constructor (world) {
    const db = new Dexie('Gumshoe')
  	db.version(1).stores({
      rooms: 'id',
      exits: 'id, startId, endId',
      items: 'id, roomId, botId, containerId',
      bots: 'id, roomId'
    })
    this.world = world
  }

  run (world) {
    console.debug('run remote')
    this.world.player.setName('Meesta Collecta')
    this.world.room.setTitle('Some Place')
    this.world.room.addText('Yeah this is the description.')
    this.world.room.addText('And another line right thar.')
    this.world.room.show()
    // this.world.wait(callback)
    // initialize state
    // register callbacks
    // render to store
  }
}

export default Remote
