export function title(state, text) {
  state.title = text
  document.title = text
}

export function width(state, num) {
  state.width = num
}

export function tab(state, name) {
  state.tab = name
}

export function location(state, open) {
  state.location = open
}

export function player(state, open) {
  state.player = open
}
