export function clear(store) {
  this.commit("viewport/clear")
  this.commit("viewportItems/clear")
  this.commit("viewportChoices/clear")
}

export function title(store, title) {
  this.commit("viewport/title", title)
}

export function seen(store) {
  this.commit("viewport/seen")
  this.commit("viewportItems/seen")
  this.commit("viewportChoices/seen")
}
