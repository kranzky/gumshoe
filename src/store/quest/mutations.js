export function clear(state) {
  state.seen = true
  state.title = null
  state.description = null
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

export function description(state, description) {
  state.seen = false
  state.description = description
}