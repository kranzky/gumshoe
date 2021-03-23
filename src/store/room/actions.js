export function clear(store) {
  this.commit("room/clear")
  this.dispatch("roomItems/clear")
  this.dispatch("roomOptions/clear")
  this.dispatch("roomChoices/clear")
}

export function reset(store) {
  this.dispatch("room/hide")
  this.dispatch("room/clear")
}

export function show(store) {
  this.commit("room/show")
}

export function hide(store) {
  this.commit("room/hide")
}

export function seen(store) {
  this.commit("room/seen")
  this.dispatch("roomItems/seen")
}

export function type(store, type) {
  this.commit("room/type", type)
}

export function id(store, id) {
  this.commit("room/id", id)
}

export function title(store, title) {
  this.commit("room/title", title)
}

export function appendItem(store, data) {
  this.dispatch("roomItems/append", data)
}

export function appendOption(store, data) {
  this.dispatch("roomOptions/append", data)
}

export function appendChoice(store, data) {
  this.dispatch("roomChoices/append", data)
}