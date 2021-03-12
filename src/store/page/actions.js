export function clear(store) {
  this.commit("page/tab", 'room')
  this.commit("page/location", false)
  this.commit("page/player", false)
}

export function title(store, title) {
  let root = this.$router.app
  if (_.isUndefined(title)) {
    title = "Gumshoe"
  }
  this.commit("page/title", title)
}

export function tab(store, name) {
  this.commit("page/tab", name)
}
