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
    setTimeout(() => {
      _.each([...this.items], (id) => {
        let item = world.items[id]
        store.add("objects", { id: id, name: item.name, type: 'item', icon: 'label', seen: item.seen })
      })
    })
  }
}

export default Entity
