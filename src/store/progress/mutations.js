export function show(state) {
  state.value = 0
  state.show = true
}

export function value(state, value) {
  state.value = value
}

export function hide(state) {
  state.show = false
  state.value = 0
}
