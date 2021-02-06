export default (namespace) => {
  return {
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
