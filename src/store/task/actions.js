export function clear(store) {
  this.commit("task/clear")
}

export function title(store, title) {
  this.commit("task/title", title)
}

export function seen(store) {
  this.commit("task/seen")
}
