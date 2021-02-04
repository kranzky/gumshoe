export function clear(state) {
  state.show = true
  state.items.length = 0
  state.choices.length = 0
  state.seen = true
}

export function appendItem(state, item) {
  state.items.push(item)
  state.seen = false
}

export function appendChoice(state, choice) {
  state.choices.push(choice)
  state.seen = false
}

export function seen(state) {
  state.seen = true
}
