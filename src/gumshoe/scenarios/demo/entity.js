import { uid } from 'quasar'

class Entity {
  constructor (name, type) {
    this.id = uid()
    this.type = type
    this.name = name
    this.seen = false
  }

  render (store, world) {
  }

  renderItems (store, world) {
    store.clear('objects')
    _.each([...this.items], (id) => {
      let item = world.items[id]
      store.add("objects", { id: id, name: item.name, type: 'item', icon: 'label', seen: item.seen })
    })
  }

  toEntity () {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      seen: this.seen
    }
  }
}

export default Entity
