import Room from './room.js'
import Item from './item.js'

class World {
  constructor () {
    this.rooms = {}
    this.items = {}
    this.currentRoom = null
    this.currentItem = null
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

  look (roomId) {
    this.currentRoom = roomId
    this.rooms[roomId].seen = true
  }

  examine (itemId) {
    this.currentItem = itemId
    this.items[itemId].seen = true
  }

  spawn () {
    let office = this.addRoom("Jason's Office", "You stand in an office, sunlight streaming in the window. A half-full mug of coffee sits on the desk.")
    let hallway = this.addRoom("Hallway", "You find yourself in a long, black-tiled hallway running the length of the house.")
    let entrance = this.addRoom("Entrance", "A small alcove near the bright red front door.")
    let courtyard = this.addRoom("Courtyard", "A tiny outdoor space, flanked by glass and a red-brick wall, utterly devoid of plants.")
    let bathroom = this.addRoom("Bathroom", "A tiled area with shower and sink and, mysteriously, various pieces of junk electronics.")
    let dining = this.addRoom("Dining Room", "A wooden dining table dominates this area.")
    let music = this.addRoom("Music Room", "This room is dominated by a large piano. Pieces of lego litter the floor.")
    let hobbit = this.addRoom("Hobbit Hole", "You squeeze yourself into a narrow opening filled with falderal that terminates with a rack of wine.")
    let kitchen = this.addRoom("Kitchen", "The mess of a recent meal pollutes all surfaces here.")
    let pantry = this.addRoom("Pantry", "Wire mesh drawers filled to overflowing with various tins and other items.")
    let family = this.addRoom("Family Room", "A red sofa faces a massive black screen.")
    let alfresco = this.addRoom("Alfresco Area", "You are now outside. A small white dog looks at you expectantly.")
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
    office.addItem(sofa)
    office.addItem(desk)
    desk.addItem(mug)
    this.look(office.id)
  }
}

export default World
