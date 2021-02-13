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
    let item = null
    if (this.type == 'item') {
      item = world.getEntity('item', this.id)
      console.log(item)
      item = world.getEntity('item', item.containerId)
      if (!_.isUndefined(item)) {
        store.add("objects", { id: item.id, name: item.name, type: 'item', icon: 'expand_less', seen: item.seen })
      }
    }
    setTimeout(() => {
      _.each([...this.items], (id) => {
        item = world.items[id]
        store.add("objects", { id: id, name: item.name, type: 'item', icon: 'label', seen: item.seen })
      })
    })
  }
}

export default Entity
