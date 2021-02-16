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
    this.dialogueBot = null
    this.carried = new Set()
  }

  render (store) {
    if (_.isNull(this.currentRoom)) {
      return;
    }
    store.hide('room')
    store.hide('places')
    store.hide('entity')
    store.hide('dialogue')
    store.hide('inventory')
    store.set('room', 'current', this.currentRoom)
    let room = this.rooms[this.currentRoom]
    room.render(store, this)
    if (!_.isNull(this.currentItem)) {
      store.set('entity', 'current', this.currentItem)
      let item = this.items[this.currentItem]
      item.render(store, this)
    }
    if (!_.isNull(this.currentBot)) {
      store.set('entity', 'current', this.currentBot)
      let bot = this.bots[this.currentBot]
      bot.render_entity(store, this)
    }
    if (!_.isNull(this.dialogueBot)) {
      store.set('dialogue', 'current', this.dialogueBot)
      let bot = this.bots[this.dialogueBot]
      bot.render(store, this)
    }
    store.clear('inventory')
    _.each([...this.carried], (item) => {
      store.add("inventory", { id: item.id, name: item.name, type: 'item', icon: 'label', seen: item.seen })
    })
    setTimeout(() => {
      store.show('room')
      store.show('places')
      store.show('entity')
      store.show('dialogue')
      store.show('inventory')
    }, 500)
  }

  renderItems (type, store) {
    store.hide('objects')
    if (type == 'room' && !_.isNull(this.currentRoom)) {
      let room = this.rooms[this.currentRoom]
      room.renderItems(store, this)
    }
    if (type == 'entity' && !_.isNull(this.currentItem)) {
      let item = this.items[this.currentItem]
      item.renderItems(store, this)
    }
    if (type == 'dialogue' && !_.isNull(this.currentBot)) {
      let bot = this.bots[this.currentBot]
      bot.renderItems(store, this)
    }
    setTimeout(() => {
      store.show('objects')
    }, 500)
  }

  getEntity (type, id) {
    if (type == 'room') {
      return this.rooms[id]
    }
    if (type == 'item') {
      return this.items[id]
    }
    if (type == 'bot') {
      return this.bots[id]
    }
    return null
  }

  addRoom (name, description) {
    let room = new Room(name)
    room.addLog(description)
    this.rooms[room.id] = room
    return room
  }

  addItem (name, description, canGet, canPut, prep) {
    let item = new Item(name, canGet, canPut, prep)
    item.addLog(description)
    this.items[item.id] = item
    return item
  }

  addBot (name, description, lines) {
    let bot = new Bot(name, description, lines)
    this.bots[bot.id] = bot
    return bot
  }

  look (roomId) {
    this.currentRoom = roomId
    this.rooms[roomId].seen = true
  }

  examine (itemId) {
    this.currentBot = null
    this.currentItem = itemId
    this.items[itemId].seen = true
  }

  examine_bot (botId) {
    this.currentItem = null
    this.currentBot = botId
    this.bots[botId].seen = true
  }

  talk () {
    this.dialogueBot = this.currentBot
    this.bots[this.dialogueBot].seen = true
  }

  take () {
    let item = this.items[this.currentItem]
    if (!item.canGet) {
      return
    }
    if (item.carried) {
      return
    }
    if (!_.isEmpty(item.roomId)) {
      this.rooms[item.roomId].removeItem(item)
    }
    if (!_.isEmpty(item.botId)) {
      this.bots[item.botId].removeItem(item)
    }
    if (!_.isEmpty(item.containerId)) {
      this.items[item.containerId].removeItem(item)
    }
    this.carried.add(item)
    item.carried = true
    item.name = `${item.original} (carrying)`
    return `You take the "${item.original}"`
  }

  drop () {
    let item = this.items[this.currentItem]
    if (!item.carried) {
      return
    }
    this.rooms[this.currentRoom].addItem(item)
    this.carried.delete(item)
    item.carried = false
    item.name = item.original
    return `You drop the "${item.original}"`
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
    let sofa = this.addItem('Red Sofa', "A comfortable sofa bed.", false, true, 'on')
    let desk = this.addItem('Wooden Desk', "An old wooden desk.", false, true, 'on')
    let mug = this.addItem('Coffee Mug', "A crusty coffee mug.", true, true, 'in')
    let cabinet = this.addItem('Shoe Cabinet', "A wooden container used for storing footwear.", false, true, 'in')
    let boots = this.addItem('Black Boots', "A pair of knee-high leather boots.", true, true, 'in')
    let sneakers = this.addItem('Grotty Sneakers', "Formerly white running shoes, now a dirty brown.", true, true, 'in')
    let hose = this.addItem('Rubber Hose', "A coiled hose, leaking water.", true, false)
    let soap = this.addItem('Hand Soap', "An empty container of hand soap.", true, false)
    let bone = this.addItem('Dog Bone', "A fresh dog bone.", true, false)
    let rack = this.addItem('Wire Drawer', "A wire drawer, for storing goods.", false, true, 'in')
    let beer = this.addItem('Beer Can', "A refreshing can of beer.", true, false)
    let rock = this.addItem('Small Rock', "A small grey stone with strange markings.", true, false)
    let sink = this.addItem('Sink', "Where all the dirty dishes go.", false, true, 'in')
    let teaspoon = this.addItem('Teaspoon', "There's always one left over from the washing up.", true, false)
    let plug = this.addItem('Plug', "Of the black rubber variety.", true, false)
    office.addItem(sofa)
    office.addItem(desk)
    desk.addItem(mug)
    entrance.addItem(cabinet)
    cabinet.addItem(boots)
    cabinet.addItem(sneakers)
    courtyard.addItem(hose)
    bathroom.addItem(soap)
    pantry.addItem(rack)
    rack.addItem(bone)
    mug.addItem(rock)
    kitchen.addItem(sink)
    sink.addItem(teaspoon)
    sink.addItem(plug)
    let jason = this.addBot("Jason", "He is working furiously on the GumShoe UI.", ["Take this manky coffee mug to the kitchen, wouldya?"])
    let jack = this.addBot("Jack", "He looks up from procedurally generating footwear.", ["Shoes in the shoe cabinet. I'll bet the food is in the pantry."])
    let rob = this.addBot("Rob", "He seems lost.", ["It's beer-o-clock and I can't find a drink.", "I've looked almost everywhere 😞"])
    let matthew = this.addBot("Matthew", "He grins at you in triumph.", ["Looks like I nabbed the last can!"])
    let bailey = this.addBot("Bailey", "He wags his tail.", ["Woof?", "(translation: Food?)"])
    office.addBot(jason)
    entrance.addBot(jack)
    hobbit.addBot(matthew)
    courtyard.addBot(rob)
    alfresco.addBot(bailey)
    matthew.addItem(beer)
    this.look(office.id)
  }
}

export default World
