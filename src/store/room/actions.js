export function reset(store) {
  this.commit("roomChoices/reset")
  this.commit("roomItems/reset")
  this.commit("room/reset")
}

export function clear(store) {
  this.commit("room/clear")
  this.commit("roomItems/clear")
  this.commit("roomChoices/clear")
}

export function title(store, title) {
  this.commit("room/title", title)
}

export function seen(store) {
  this.commit("room/seen")
  this.commit("roomItems/seen")
  this.commit("roomChoices/seen")
}
