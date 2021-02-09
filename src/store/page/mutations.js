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

export function world(state, open) {
  state.world = open
}

export function player(state, open) {
  state.player = open
}
