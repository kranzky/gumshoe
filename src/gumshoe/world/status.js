import Entity from './entity.js'

class Status extends Entity {
  setPlayer (name) {
    this._set('player', name)
  }

  setLocation (name) {
    this._set('location', name)
  }
}

export default Status
