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
    this._appendItem({ text: text })
  }

  addOption (item, action, data) {
    if (_.isUndefined(data)) {
      data = {}
    }
    this._appendOption({ id: item.id, type: item.type, name: item.name, action: action, data: data })
  }

  addChoice (text, action, data) {
    if (_.isUndefined(data)) {
      data = {}
    }
    this._appendChoice({ text: text, action: action, data: data })
  }

  addCrumb (item, action, data) {
    if (_.isUndefined(data)) {
      data = {}
    }
    this._appendCrumb({ id: item.id, type: item.type, name: item.name, action: action, data: data })
  }
}

export default Item
