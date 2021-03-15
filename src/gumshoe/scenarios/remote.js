import { LocalStorage, SessionStorage } from 'quasar'
import Dexie from 'dexie'

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
    this.world.transcript.addHeading('Chapter 1')
    this.world.transcript.addParagraph('Something', 'Somewhen', 'Blag')
    this.world.transcript.show()
    this.world.room.setTitle('Some Place Dude 4')
    this.world.room.addText('Yeah this is the description.')
    this.world.room.addText('And another line right thar.')
    this.world.room.show()
    this.world.item.setTitle('Something')
    this.world.item.addText('This is some text.')
    this.world.item.addText('And some moar.')
    this.world.item.setSubtitle('Whatever')
    this.world.item.show()
    this.world.dialogue.show()
    this.world.quest.show()
    this.world.location.people.append({ name: 'fred' })
    this.world.location.people.show()
    this.world.location.places.append({ name: 'hallway' })
    this.world.location.places.show()
    this.world.location.objects.append({ name: 'spatula' })
    this.world.location.objects.show()
    this.world.player.inventory.append({ name: 'widget' })
    this.world.player.inventory.show()
    this.world.player.notebook.append({ name: 'michael', type: 'bot' })
    this.world.player.notebook.append({ name: 'garage', type: 'room' })
    this.world.player.notebook.append({ name: 'toolbag', type: 'item' })
    this.world.player.notebook.append({ name: 'mystery', type: 'task' })
    this.world.player.notebook.show()
    this.world.player.quests.append({ name: 'solved', complete: true })
    this.world.player.quests.append({ name: 'unsolved', complete: false })
    this.world.player.quests.show()
  }

  stop () {
  }
}

export default Remote