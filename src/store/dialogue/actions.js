export function clear(store) {
  this.commit("dialogue/clear")
  this.dispatch("dialogueItems/clear")
  this.dispatch("dialogueOptions/clear")
  this.dispatch("dialogueChoices/clear")
}

export function reset(store) {
  this.dispatch("dialogue/hide")
  this.dispatch("dialogue/clear")
}

export function show(store) {
  this.commit("dialogue/show")
}

export function hide(store) {
  this.commit("dialogue/hide")
}

export function seen(store) {
  this.commit("dialogue/seen")
  this.dispatch("dialogueItems/seen")
}

export function appendItem(store, data) {
  this.dispatch("dialogueItems/append", data)
}

export function appendOption(store, data) {
  this.dispatch("dialogueOptions/append", data)
}

export function appendChoice(store, data) {
  this.dispatch("dialogueChoices/append", data)
}

export function current(store, id) {
  this.commit("dialogue/current", id)
}
