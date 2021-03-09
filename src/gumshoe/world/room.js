import Entity from './entity.js'

class Room extends Entity {
  show () {
    this._show()
  }

  setTitle (title) {
    this._set('title', title)
  }

  addText (text) {
    this._append({ text: text })
  }
}

export default Room
