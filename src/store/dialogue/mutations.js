function clear(state) {
  state.seen = true
}

export function hide(state) {
  state.visible = false
}

export function show(state) {
  state.visible = true
}

export function seen(state) {
  state.seen = true
}

export function current(state, id) {
  state.current = id
}
