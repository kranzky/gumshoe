export function clear(state) {
  state.title = null
  state.items.length = 0
  state.choices.length = 0
  state.seen = true
}

export function title(state, title) {
  state.title = title
  state.seen = false
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
