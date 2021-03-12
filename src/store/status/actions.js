export function reset(store) {
  this.commit("status/time", null)
  this.commit("status/player", null)
  this.commit("status/location", null)
  this.commit("status/score", null)
  this.commit("page/tab", 'room')
  this.commit("page/location", false)
  this.commit("page/player", false)
  store.dispatch("entity/reset", null, { root: true })
  store.dispatch("room/reset", null, { root: true })
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
  this.commit("status/time", time)
}

export function player(store, player) {
  this.commit("status/player", player)
}

export function location(store, location) {
  this.commit("status/location", location)
}

export function score(store, score) {
  this.commit("status/score", score)
}
