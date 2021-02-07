export function clear(state) {
  state.show = true
  state.seen = true
  state.title = null
}

export function title(state, title) {
  state.seen = false
  state.title = title
}

export function seen(state) {
  state.seen = true
}
