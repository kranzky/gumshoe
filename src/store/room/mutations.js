export function clear(state) {
  state.seen = true
  state.title = null
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

export function title(state, title) {
  state.seen = false
  state.title = title
}

export function current(state, id) {
  state.current = id
}
