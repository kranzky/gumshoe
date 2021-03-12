import Entity from './entity.js'

class Item extends Entity {
  show () {
    this._show()
  }

  setType (type) {
    this._set('type', type)
  }

  setTitle (title) {
    this._set('title', title)
  }

  setSubtitle (subtitle) {
    this._set('subtitle', subtitle)
  }

  addText (text) {
    this._append({ text: text })
  }
}

export default Item
