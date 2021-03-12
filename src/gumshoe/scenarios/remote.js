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
    this.world.status.setTime("Thu 17:27")
    this.world.status.setPlayer('Whatever Dude')
    this.world.status.setLocation('Some Place Dude')
    this.world.status.setScore(137)
    this.world.room.setTitle('Some Place Dude 4')
    this.world.room.addText('Yeah this is the description.')
    this.world.room.addText('And another line right thar.')
    // this.world.location.exits.add({ id: 1, name: 'whatever' })
    this.world.room.show()
    this.world.item.show()
    // this.world.wait(callback)
    // initialize state
    // register callbacks
    // render to store
  }

  stop () {
  }
}

export default Remote