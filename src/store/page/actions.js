export function setTitle(store, title) {
  let root = this.$router.app;
  if (_.isUndefined(title)) {
    title = "Gumshoe";
  }
  this.commit("page/title", title);
}
