export function clear(store) {
  this.commit("entity/clear")
  this.dispatch("entityItems/clear")
  this.dispatch("entityChoices/clear")
  this.dispatch("entityCrumbs/clear")
}

export function reset(store) {
  this.dispatch("entity/hide")
  this.dispatch("entity/clear")
}

export function show(store) {
  this.commit("entity/show")
}

export function hide(store) {
  this.commit("entity/hide")
}

export function seen(store) {
  this.commit("entity/seen")
  this.commit("entityItems/seen")
}

export function title(store, title) {
  this.commit("entity/title", title)
}

export function subtitle(store, subtitle) {
  this.commit("entity/subtitle", subtitle)
}

export function current(store, id) {
  this.commit("entity/current", id)
}

export function type(store, type) {
  this.commit("entity/type", type)
}
