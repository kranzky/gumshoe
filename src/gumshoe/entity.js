import { uid } from 'quasar'

class Entity {
  constructor (name, type) {
    this.id = uid()
    this.type = type
    this.name = name
  }

  render (store) {
  }
}

export default Entity
