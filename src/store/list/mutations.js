export function clear(state) {
  state.show = true
  state.hasItems = false
  state.items = {}
}

export function append(state, item) {
  state.hasItems = true
  state.items[item.id] = item
}

export function seen(state, id) {
  state.items[id].seen = true
}
