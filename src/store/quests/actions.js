export function clear(store) {
  this.commit("quests/clear")
}

export function items(store, item) {
  this.commit("quests/items", item)
}
