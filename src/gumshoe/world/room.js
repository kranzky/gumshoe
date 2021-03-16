import Entity from './entity.js'

class Room extends Entity {
  show () {
    this._show()
  }

  setTitle (title) {
    this._set('title', title)
  }

  addText (text) {
    this._appendItem({ text: text })
  }

  addOption (type, name, action, data) {
    if (_.isUndefined(data)) {
      data = {}
    }
    this._appendOption({ type: type, name: name, action: action, data: data })
  }

  addChoice (text, action, data) {
    if (_.isUndefined(data)) {
      data = {}
    }
    this._appendChoice({ text: text, action: action, data: data })
  }
}

export default Room
