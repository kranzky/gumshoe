export default (namespace) => {
  return {
    clear (store) {
      this.commit(`${namespace}/clear`)
    },
    items (store, item) {
      this.commit(`${namespace}/items`, item)
    },
    seen (store, id) {
      this.commit(`${namespace}/seen`, id)
    }
  }
}
