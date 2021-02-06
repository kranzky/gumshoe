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

export function seen(state, id) {
  let item = _.find(state.items, (item) => { return item.id == id })
  item.seen = true
}
