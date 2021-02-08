export function reset(store) {
  this.commit("questItems/reset")
  this.commit("quest/reset")
}

export function clear(store) {
  this.commit("quest/clear")
  this.commit("questItems/clear")
}

export function title(store, title) {
  this.commit("quest/title", title)
}

export function description(store, description) {
  this.commit("quest/description", description)
}

export function seen(store) {
  this.commit("quest/seen")
  this.commit("questItems/seen")
}
