import Room from './room.js'

class World {
  constructor () {
    this.rooms = []
    this.currentRoom = null
  }

  render (store) {
    if (_.isNull(this.currentRoom)) {
      return;
    }
    this.currentRoom.render(store)
  }

  spawn () {
    let room = new Room("Jason's Office")
    this.rooms.push(room)
    this.currentRoom = room
  }
}

export default World
