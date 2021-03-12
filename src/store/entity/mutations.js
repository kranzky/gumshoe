export function clear(state) {
  state.seen = true
  state.title = null
  state.subtitle = null
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

export function subtitle(state, subtitle) {
  state.seen = false
  state.subtitle = subtitle
}

export function current(state, id) {
  state.current = id
}

export function type(state, type) {
  state.type = type
}
