import Entity from './entity.js'

class Status extends Entity {
  setTime (time) {
    this._set('time', time)
  }

  setPlayer (player) {
    this._set('player', player)
  }

  setLocation (location) {
    this._set('location', location)
  }

  setScore (score) {
    this._set('score', score)
  }
}

export default Status
