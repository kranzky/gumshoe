export function clear(store) {
  this.commit("transcript/clear")
}

export function append(store, item) {
  this.commit("transcript/append", item)
}

export function seen(store) {
  this.commit("transcript/seen")
}
