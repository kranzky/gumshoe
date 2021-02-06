import { uid } from 'quasar'

export function clear(state) {
  state.show = true
  state.items.length = 0
}

export function append(state, item) {
  item.id = uid()
  item.seen = false
  state.items.push(item)
}

export function remove(state, id) {
  let index = _.findIndex(state.items, (item) => { return item.id == id })
  state.items.splice(index, 1)
}

export function seen(state, id) {
  if (_.isUndefined(id)) {
    _.each(state.items, (item) => { item.seen = true })
  } else {
    let item = _.find(state.items, (item) => { return item.id == id })
    item.seen = true
  }
}
