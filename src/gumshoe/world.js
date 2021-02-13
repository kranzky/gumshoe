import Room from './room.js'
import Item from './item.js'
import Bot from './bot.js'

class World {
  constructor () {
    this.rooms = {}
    this.items = {}
    this.bots = {}
    this.currentRoom = null
    this.currentItem = null
    this.currentBot = null
  }

  render (store) {
    if (_.isNull(this.currentRoom)) {
      return;
    }
    store.hide('room')
    store.hide('places')
    store.hide('objects')
    store.hide('entity')
    setTimeout(() => {
      let room = this.rooms[this.currentRoom]
      room.render(store, this)
      if (!_.isNull(this.currentItem)) {
        let item = this.items[this.currentItem]
        item.render(store, this)
      }
      if (!_.isNull(this.currentBot)) {
        let bot = this.bots[this.currentBot]
        bot.render(store, this)
      }
      setTimeout(() => {
        store.show('room')
        store.show('places')
        store.show('objects')
        store.show('entity')
      }, 800)
    })
  }

  addRoom (name, description) {
    let room = new Room(name)
    room.addLog(description)
    this.rooms[room.id] = room
    return room
  }

  addItem (name, description) {
    let item = new Item(name)
    item.addLog(description)
    this.items[item.id] = item
    return item
  }

  addBot (name) {
    let bot = new Bot(name)
    this.bots[bot.id] = bot
    return bot
  }

  look (roomId) {
    this.currentRoom = roomId
    this.rooms[roomId].seen = true
  }

  examine (itemId) {
    this.currentItem = itemId
    this.items[itemId].seen = true
  }

  talk (botId) {
    this.currentBot = botId
    this.bots[botId].seen = true
  }

  spawn () {
    let office = this.addRoom("Jason's Office", "You stand in a cosy home office, sunlight streaming in the window.")
    let hallway = this.addRoom("Hallway", "You find yourself in a long, black-tiled hallway running the length of the house.")
    let entrance = this.addRoom("Entrance", "A small alcove near the bright red front door.")
    let courtyard = this.addRoom("Courtyard", "A tiny outdoor space, flanked by glass and a red-brick wall, utterly devoid of plants.")
    let bathroom = this.addRoom("Bathroom", "A tiled area for ablutions.")
    let dining = this.addRoom("Dining Room", "The main space for eating meals.")
    let music = this.addRoom("Music Room", "A sunken room dedicated to the pursuit of music. And lego.")
    let hobbit = this.addRoom("Hobbit Hole", "You squeeze yourself into a narrow opening.")
    let kitchen = this.addRoom("Kitchen", "The mess of a recent meal pollutes all surfaces here.")
    let pantry = this.addRoom("Pantry", "Wire mesh drawers filled to overflowing with various tins and other items.")
    let family = this.addRoom("Family Room", "The main space for relaxing and entertainment.")
    let alfresco = this.addRoom("Alfresco Area", "You are now outside the house.")
    office.addExit(hallway)
    entrance.addExit(hallway)
    courtyard.addExit(hallway)
    bathroom.addExit(hallway)
    bathroom.addExit(office)
    dining.addExit(hallway)
    dining.addExit(music)
    music.addExit(hobbit)
    dining.addExit(kitchen)
    kitchen.addExit(pantry)
    dining.addExit(family)
    kitchen.addExit(family)
    family.addExit(alfresco)
    let sofa = this.addItem('Red Sofa', "A comfortable sofa bed.")
    let desk = this.addItem('Wooden Desk', "An old wooden desk.")
    let mug = this.addItem('Coffee Mug', "A crusty coffee mug.")
    let cabinet = this.addItem('Shoe Cabinet', "A wooden container used for storing footwear.")
    let boots = this.addItem('Black Boots', "A pair of knee-high leather boots.")
    let sneakers = this.addItem('Grotty Sneakers', "Formerly white running shoes, now a dirty brown.")
    let hose = this.addItem('Rubber Hose', "A coiled hose, leaking water.")
    let soap = this.addItem('Hand Soap', "An empty container of hand soap.")
    let bone = this.addItem('Dog Bone', "A fresh dog bone.")
    let beer = this.addItem('Beer Can', "A refreshing can of beer.")
    office.addItem(sofa)
    office.addItem(desk)
    desk.addItem(mug)
    entrance.addItem(cabinet)
    cabinet.addItem(boots)
    cabinet.addItem(sneakers)
    courtyard.addItem(hose)
    bathroom.addItem(soap)
    pantry.addItem(bone)
    let jason = this.addBot("Jason")
    let jack = this.addBot("Jack")
    let rob = this.addBot("Rob")
    let matthew = this.addBot("Matthew")
    let bailey = this.addBot("Bailey")
    office.addBot(jason)
    entrance.addBot(jack)
    hobbit.addBot(matthew)
    family.addBot(jack)
    alfresco.addBot(bailey)
    matthew.addItem(beer)
    this.look(office.id)
  }
}

export default World
