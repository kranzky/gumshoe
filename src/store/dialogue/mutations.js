import { uid } from 'quasar'

export function clear(state) {
  state.show = true
  state.seen = true
  state.items.length = 0
  state.choices.length = 0
}

export function appendItem(state, item) {
  state.seen = false
  item.id = uid()
  state.items.push(item)
}

export function appendChoice(state, choice) {
  state.seen = false
  choice.id = uid()
  state.choices.push(choice)
}

export function removeChoice(state, id) {
  let index = _.findIndex(state.choices, (choice) => { return choice.id == id })
  state.choices.splice(index, 1)
}

export function seen(state) {
  state.seen = true
}
