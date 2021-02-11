import Room from './room.js'

class World {
  constructor () {
    this.rooms = {}
    this.currentRoom = null
  }

  render (store) {
    if (_.isNull(this.currentRoom)) {
      return;
    }
    let room = this.rooms[this.currentRoom]
    room.render(store, this)
  }

  addRoom (name) {
    let room = new Room(name)
    this.rooms[room.id] = room
    return room
  }

  spawn () {
    let room = this.addRoom("Jason's Office")
    let hallway = this.addRoom("Hallway")
    room.addExit(hallway)
    this.currentRoom = room.id
  }
}

export default World
