export function clear(store) {
  this.commit("viewport/clear")
}

export function title(store, title) {
  this.commit("viewport/title", title)
}

export function appendItem(store, item) {
  this.commit("viewport/appendItem", item)
}

export function appendChoice(store, choice) {
  this.commit("viewport/appendChoice", choice)
}

export function removeChoice(store, id) {
  this.commit("viewport/removeChoice", id)
}

export function seen(store) {
  this.commit("viewport/seen")
}
