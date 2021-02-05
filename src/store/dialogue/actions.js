export function clear(store) {
  this.commit("dialogue/clear")
}

export function appendItem(store, item) {
  this.commit("dialogue/appendItem", item)
}

export function appendChoice(store, choice) {
  this.commit("dialogue/appendChoice", choice)
}

export function removeChoice(store, id) {
  this.commit("dialogue/removeChoice", id)
}

export function seen(store) {
  this.commit("dialogue/seen")
}
