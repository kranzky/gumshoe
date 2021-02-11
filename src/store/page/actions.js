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
