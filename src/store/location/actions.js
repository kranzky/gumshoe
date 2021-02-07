export function clear(store) {
  this.commit("location/clear")
  this.commit("locationItems/clear")
  this.commit("locationChoices/clear")
}

export function title(store, title) {
  this.commit("location/title", title)
}

export function seen(store) {
  this.commit("location/seen")
  this.commit("locationItems/seen")
  this.commit("locationChoices/seen")
}
