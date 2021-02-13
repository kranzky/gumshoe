export function reset(store) {
  this.commit("entityCrumbs/reset")
  this.commit("entityChoices/reset")
  this.commit("entityItems/reset")
  this.commit("entity/reset")
}

export function clear(store) {
  this.commit("entity/clear")
  this.commit("entityItems/clear")
  this.commit("entityChoices/clear")
  this.commit("entityCrumbs/clear")
}

export function title(store, title) {
  this.commit("entity/title", title)
}

export function seen(store) {
  this.commit("entity/seen")
  this.commit("entityItems/seen")
}
