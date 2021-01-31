export function clear(state) {
  state.items.length = 0
}

export function items(state, item) {
  state.items.push(item)
}
