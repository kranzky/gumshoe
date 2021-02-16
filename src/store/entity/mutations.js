function wipe(state) {
  state.seen = true
  state.title = null
  state.subtitle = null
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

export function subtitle(state, subtitle) {
  state.seen = false
  state.subtitle = subtitle
}

export function seen(state) {
  state.seen = true
}

export function loading(state, loading) {
  state.loading = loading
}

export function current(state, id) {
  state.current = id
}
