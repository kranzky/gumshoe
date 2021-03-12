import Entity from './entity.js'

class List extends Entity {
  show () {
    this._show()
  }

  append (item) {
    this._append(item)
  }

  remove (id) {
    this._remove(id)
  }
}

export default List
