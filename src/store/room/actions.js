export function clear(store) {
  this.commit("room/clear")
  this.commit("roomItems/clear")
  this.commit("roomChoices/clear")
}

export function title(store, title) {
  this.commit("room/title", title)
}

export function append(store, data) {
  this.commit("roomItems/append", data)
}

export function seen(store) {
  this.commit("room/seen")
  this.commit("roomItems/seen")
}

export function current(store, id) {
  this.commit("room/current", id)
}

export function show(store) {
  this.commit("room/show")
}

export function hide(store) {
  this.commit("room/hide")
}
