import Entity from './entity.js'

class Player extends Entity {
  setName (name) {
    this._set('player', name)
  }
}

export default Player
