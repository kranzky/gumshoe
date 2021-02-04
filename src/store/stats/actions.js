export function time(store, time) {
  this.commit("stats/time", time)
}

export function player(store, player) {
  this.commit("stats/player", player)
}

export function score(store, score) {
  this.commit("stats/score", score)
}
