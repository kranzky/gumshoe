export function clear(store) {
  this.commit("status/time", null)
  this.commit("status/player", null)
  this.commit("status/location", null)
  this.commit("status/score", null)
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
