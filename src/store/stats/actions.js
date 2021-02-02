export function time(store, time) {
  let root = this.$router.app
  root.$emit("punk:info", "Time passes.")
  this.commit("stats/time", time)
}

export function player(store, player) {
  let root = this.$router.app
  root.$emit("punk:info", "You become somebody.")
  this.commit("stats/player", player)
}

export function score(store, score) {
  let root = this.$router.app
  root.$emit("punk:info", "Your score has changed.")
  this.commit("stats/score", score)
}
