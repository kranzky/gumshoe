import Room from './demo/room.js'
import Item from './demo/item.js'
import Bot from './demo/bot.js'
import Quest from './demo/quest.js'

class Demo {
  constructor (world) {
    this.rooms = {}
    this.items = {}
    this.bots = {}
    this.quests = {}
    this.currentRoom = null
    this.currentItem = null
    this.currentBot = null
    this.currentQuest = null
    this.dialogueBot = null
    this.carried = new Set()
    this.world = world
  }

  run () {
    this.spawn()
    // TODO: display status items
    this.render()
  }

  stop () {
  }

  getEntity (type, id) {
    switch (type) {
      case 'room':
        return this.rooms[id].toEntity()
      case 'item':
        return this.items[id].toEntity()
      case 'bot':
        return this.bots[id].toEntity()
    }
    return null
  }

  move (id, data) {
    let room = this.rooms[id]
    room.seen = true
    this.world.notify(`You go to the "${room.name}"`)
    // TODO: set location name in status
    room.render(this.world, this)
    this.currentRoom = id
  }

  examine (id, data) {
    let item = this.items[id]
    item.seen = true
    this.world.notify(`You examine the "${item.name}"`)
    item.render(this.world, this)
    this.currentItem = id
    this.currentBot = null
  }

  approach (id, data) {
    let bot = this.bots[id]
    bot.seen = true
    this.world.notify(`You approach "${bot.name}"`)
    bot.render_entity(this.world, this)
    this.currentItem = null
    this.currentBot = id
  }

  talk (id, data) {
    this.dialogueBot = this.currentBot
    let bot = this.bots[this.dialogueBot]
    let room = this.rooms[this.currentRoom]
    bot.seen = true
    this.update('talk', bot, room)
  }

  update (action, entity, place) {
    _.each(this.quests, (quest) => {
      quest.update(action, entity, place)
    })
  }

  render () {
    if (!_.isNull(this.currentRoom)) {
      let room = this.rooms[this.currentRoom]
      room.render(this.world, this)
    }
    if (!_.isNull(this.currentItem)) {
      let item = this.items[this.currentItem]
      item.render(this.world, this)
    }
    if (!_.isNull(this.currentBot)) {
      let bot = this.bots[this.currentBot]
      bot.render_entity(this.world, this)
    }
    if (!_.isNull(this.dialogueBot)) {
      let bot = this.bots[this.dialogueBot]
      bot.render(this.world, this)
    }
    return
    store.clear('inventory')
    _.each([...this.carried], (item) => {
      store.add("inventory", { id: item.id, name: item.name, detail: item.detail, type: 'item', icon: 'label', seen: item.seen })
    })
    store.clear('quests')
    _.each(this.quests, (quest) => {
      if (quest.active) {
        store.add("quests", { id: quest.id, name: quest.name, type: 'quest', icon: quest.complete ? 'assignment_turned_in' : 'assignment_late', seen: quest.seen })
      }
    })
    if (!_.isNull(this.currentQuest)) {
      let quest = this.quests[this.currentQuest]
      quest.render(store, this)
    }
    setTimeout(() => {
      store.show('room')
      store.show('places')
      if (this.currentItem || this.currentBot) {
        store.show('entity')
      }
      store.show('dialogue')
      store.show('inventory')
      store.show('quests')
      store.show('quest')
    }, 500)
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

  removeItem (item, store) {
    let room = this.rooms[item.roomId]
    room.removeItem(item)
    this.currentItem = null
    store.clear('entity')
    store.hide('entity')
    setTimeout(() => {
      store.set("page", "tab", 'room')
    }, 500)
  }

  addBot (name, description, lines) {
    let bot = new Bot(name, description, lines)
    this.bots[bot.id] = bot
    return bot
  }

  addQuest (name, description, success, trigger, tasks) {
    let quest = new Quest(name, description, success, trigger, tasks)
    this.quests[quest.id] = quest
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
    item.detail = "carrying"
    let room = this.rooms[this.currentRoom]
    this.update('take', item, room)
    return `You take the "${item.name}"`
  }

  drop () {
    let item = this.items[this.currentItem]
    if (!item.carried) {
      return
    }
    this.rooms[this.currentRoom].addItem(item)
    this.carried.delete(item)
    item.carried = false
    item.detail = null
    let room = this.rooms[this.currentRoom]
    this.update('drop', item, room)
    return `You drop the "${item.name}"`
  }

  spawn () {
    let office = this.addRoom("Jason's Office", "A cosy home office, sunlight streaming in the window.")
    let hallway = this.addRoom("Hallway", "A long, black-tiled hallway running the length of the house.")
    let entrance = this.addRoom("Entrance", "A small alcove near the bright red front door.")
    let courtyard = this.addRoom("Courtyard", "A tiny outdoor space, flanked by glass and a red-brick wall, utterly devoid of plants.")
    let bathroom = this.addRoom("Bathroom", "A tiled area for ablutions.")
    let dining = this.addRoom("Dining Room", "The main space for eating meals.")
    let music = this.addRoom("Music Room", "A sunken room dedicated to the pursuit of music. And lego.")
    let hobbit = this.addRoom("Hobbit Hole", "A narrow opening.")
    let kitchen = this.addRoom("Kitchen", "The mess of a recent meal pollutes all surfaces here.")
    let pantry = this.addRoom("Pantry", "Wire mesh drawers filled to overflowing with various tins and other items.")
    let family = this.addRoom("Family Room", "The main space for relaxing and entertainment.")
    let alfresco = this.addRoom("Alfresco Area", "An outside undercover area.")
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
    this.addQuest("Dirty Mug", "Get that filth off Jason's desk and into the sink.", "You casually throw the mug into the sink, where it vanishes!", { action: 'talk', entity: jason }, [
      {
        name: "Grab the coffee mug.",
        trigger: {
          action: 'take',
          entity: mug
        }
      }, {
        name: "Put it in the kitchen sink.",
        trigger: {
          action: 'drop',
          entity: mug,
          room: kitchen
        }
      }
    ])
    this.addQuest("Booze Run", "That man needs a drink!", "You hand Rob the beer which he eagerly consumes, can and all.", { action: 'talk', entity: rob }, [
      {
        name: "Obtain a can of beer.",
        trigger: {
          action: 'take',
          entity: beer
        }
      }, {
        name: "Give it to Rob!",
        trigger: {
          action: 'drop',
          entity: beer,
          room: courtyard
        }
      }
    ])
    this.addQuest("Feed Fido", "Get some food for that doggo.", "Bailey rips the bone from your hand and swallows it whole (the bone, not your hand)!", { action: 'talk', entity: bailey }, [
      {
        name: "Find something a dog would like to eat.",
        trigger: {
          action: 'take',
          entity: bone
        }
      }, {
        name: "Feed it to Bailey.",
        trigger: {
          action: 'drop',
          entity: bone,
          room: alfresco
        }
      }
    ])
    this.currentRoom = office.id
    office.seen = true
  }
}

export default Demo