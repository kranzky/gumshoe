import Entity from './entity.js'

class Item extends Entity {
  show () {
    this._show()
  }

  setTitle (title) {
    this._set('title', title)
  }

  setSubtitle (subtitle) {
    this._set('subtitle', subtitle)
  }

  setType (type) {
    this._set('type', type)
  }
}

export default Item
