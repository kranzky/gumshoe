export function reset(store) {
  this.commit("dialogueChoices/reset")
  this.commit("dialogueItems/reset")
  this.commit("dialogue/reset")
}

export function clear(store) {
  this.commit("dialogue/clear")
  this.commit("dialogueItems/clear")
  this.commit("dialogueChoices/clear")
}

export function seen(store) {
  this.commit("dialogue/seen")
}

export function current(store, id) {
  this.commit("dialogue/current", id)
}
