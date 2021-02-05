export function clear(state) {
  state.show = true
  state.items.length = 0
  state.choices = {}
  state.seen = true
  state.hasChoices = false
}

export function appendItem(state, item) {
  state.items.push(item)
  state.seen = false
}

export function appendChoice(state, choice) {
  state.choices[choice.id] = choice
  state.seen = false
  state.hasChoices = true
}

export function removeChoice(state, id) {
  delete state.choices[id]
  state.hasChoices = !_.isEmpty(state.choices)
}

export function seen(state) {
  state.seen = true
}
