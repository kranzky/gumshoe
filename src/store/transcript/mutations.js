import { uid } from 'quasar'

export function clear(state) {
  state.show = true
  state.seen = true
  state.items.length = 0
}

export function append(state, item) {
  state.seen = false
  item.id = uid()
  state.items.push(item)
}

export function seen(state) {
  state.seen = true
}
