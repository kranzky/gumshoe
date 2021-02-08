function wipe(state) {
  state.seen = true
  state.title = null
  state.description = null
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

export function description(state, description) {
  state.seen = false
  state.description = description
}

export function seen(state) {
  state.seen = true
}
