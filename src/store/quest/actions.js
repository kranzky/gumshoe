export function clear(store) {
  this.commit("quest/clear")
  this.dispatch("questItems/clear")
}

export function reset(store) {
  this.dispatch("quest/hide")
  this.dispatch("quest/clear")
}

export function show(store) {
  this.commit("quest/show")
}

export function hide(store) {
  this.commit("quest/hide")
}

export function seen(store) {
  this.commit("quest/seen")
  this.dispatch("questItems/seen")
}

export function title(store, title) {
  this.commit("quest/title", title)
}

export function description(store, description) {
  this.commit("quest/description", description)
}

export function appendItem(store, data) {
  this.dispatch("questItems/append", data)
}