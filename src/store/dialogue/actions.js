export function clear(store) {
  this.commit("dialogue/clear")
  this.commit("dialogueItems/clear")
  this.commit("dialogueChoices/clear")
}

export function seen(store) {
  this.commit("dialogue/seen")
  this.commit("dialogueItems/seen")
  this.commit("dialogueChoices/seen")
}
