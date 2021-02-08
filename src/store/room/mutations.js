function wipe(state) {
  state.seen = true
  state.title = null
}

export function reset(state) {
  state.show = false
  wipe(state)
}

export function clear(state) {
  wipe(state)
  state.show = true
}

export function title(state, title) {
  state.seen = false
  state.title = title
}

export function seen(state) {
  state.seen = true
}
