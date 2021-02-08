function wipe(state) {
  state.value = 0
}

export function reset(state) {
  state.show = false
  wipe(state)
}

export function show(state) {
  wipe(state)
  state.show = true
}

export function value(state, value) {
  state.value = value
}

export function hide(state) {
  state.show = false
  state.value = 0
}
