import { uid } from 'quasar'

class Entity {
  constructor (name, type) {
    this.id = uid()
    this.type = type
    this.name = name
    this.seen = false
  }

  render (store) {
  }
}

export default Entity
