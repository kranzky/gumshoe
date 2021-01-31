export function clear(store) {
  this.commit("quests/clear")
}

export function items(store, item) {
  this.commit("quests/items", item)
}

export function seen(store, id) {
  this.commit("quests/seen", id)
}
