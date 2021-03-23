export function clear(store) {
  this.commit("entity/clear")
  this.dispatch("entityItems/clear")
  this.dispatch("entityOptions/clear")
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

export function type(store, type) {
  this.commit("entity/type", type)
}

export function id(store, id) {
  this.commit("entity/id", id)
}

export function title(store, title) {
  this.commit("entity/title", title)
}

export function subtitle(store, subtitle) {
  this.commit("entity/subtitle", subtitle)
}

export function appendItem(store, data) {
  this.dispatch("entityItems/append", data)
}

export function appendOption(store, data) {
  this.dispatch("entityOptions/append", data)
}

export function appendChoice(store, data) {
  this.dispatch("entityChoices/append", data)
}

export function appendCrumb(store, data) {
  this.dispatch("entityCrumbs/append", data)
}