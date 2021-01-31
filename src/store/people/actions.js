export function clear(store) {
  this.commit("people/clear")
}

export function items(store, item) {
  this.commit("people/items", item)
}

export function seen(store, id) {
  this.commit("people/seen", id)
}
