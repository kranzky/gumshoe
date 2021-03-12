import Entity from './entity.js'

class List extends Entity {
  constructor (store, component, defaultType) {
    super(store, component)
    this.defaultType = defaultType
  }

  show () {
    this._show()
  }

  append (item) {
    if (_.isUndefined(item.type)) {
      this.defaultType
    }
    item.type = this.defaultType
    this._append(item)
  }

  remove (id) {
    this._remove(id)
  }
}

export default List
