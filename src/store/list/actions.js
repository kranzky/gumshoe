export default (namespace) => {
  return {
    reset (store) {
      this.commit(`${namespace}/reset`)
    },
    clear (store) {
      this.commit(`${namespace}/clear`)
    },
    append (store, item) {
      this.commit(`${namespace}/append`, item)
    },
    remove(store, id) {
      this.commit(`${namespace}/remove`, id)
    },
    seen (store, id) {
      this.commit(`${namespace}/seen`, id)
    }
  }
}
