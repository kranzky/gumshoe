export function clear(store) {
  this.commit("item/clear")
}

export function title(store, title) {
  this.commit("item/title", title)
}

export function seen(store) {
  this.commit("item/seen")
}
