export function clear(state) {
  state.show = true
  state.items.length = 0
  state.seen = true
}

export function append(state, item) {
  state.items.push(item)
  state.seen = false
}

export function seen(state) {
  state.seen = true
}
