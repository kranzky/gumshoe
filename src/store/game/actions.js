export function reset(store) {
  this.commit("game/time", null)
  this.commit("game/player", null)
  this.commit("game/score", null)
  this.commit("page/tab", 'room')
  this.commit("page/world", false)
  this.commit("page/player", false)
  store.dispatch("entity/reset", null, { root: true })
  store.dispatch("room/reset", null, { root: true })
  store.dispatch("roomItems/reset", null, { root: true })
  store.dispatch("roomChoices/reset", null, { root: true })
  store.dispatch("entity/reset", null, { root: true })
  store.dispatch("dialogue/reset", null, { root: true })
  store.dispatch("dialogueItems/reset", null, { root: true })
  store.dispatch("dialogueChoices/reset", null, { root: true })
  store.dispatch("quest/reset", null, { root: true })
  store.dispatch("questItems/reset", null, { root: true })
  store.dispatch("transcript/reset", null, { root: true })
  store.dispatch("places/reset", null, { root: true })
  store.dispatch("people/reset", null, { root: true })
  store.dispatch("objects/reset", null, { root: true })
  store.dispatch("inventory/reset", null, { root: true })
  store.dispatch("notebook/reset", null, { root: true })
  store.dispatch("quests/reset", null, { root: true })
}

export function time(store, time) {
  this.commit("game/time", time)
}

export function player(store, player) {
  this.commit("game/player", player)
}

export function score(store, score) {
  this.commit("game/score", score)
}
