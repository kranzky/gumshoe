export function clear(state) {
  state.items.length = 0
}

export function items(state, item) {
  state.items.push(item)
}

export function seen(state, id) {
  let item = _.find(state.items, (item) => { return item.id == id })
  item.seen = true
}
