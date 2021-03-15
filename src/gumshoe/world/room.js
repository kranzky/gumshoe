import { _ } from 'core-js'
import Entity from './entity.js'

// need to have exits, items, bots
// each of these can be a List entity
// contents should just be name, type, id
// need logic to render correct items list
// differentiate room we're looking at from room player is in
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

  addChoice (text, action, data) {
    if (_.isUndefined(data)) {
      data = {}
    }
    this._appendChoice({ text: text, action: action, data: data })
  }
}

export default Room
