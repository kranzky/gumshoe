function wipe(state) {
  state.seen = true
}

export function reset(state) {
  state.show = false
  wipe(state)
}

export function clear(state) {
  wipe(state)
  state.show = true
}

export function seen(state) {
  state.seen = true
}
