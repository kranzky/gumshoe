export default (namespace) => {
  return {
    clear (store) {
      this.commit(`${namespace}/clear`)
    },
    reset (store) {
      this.dispatch(`${namespace}/hide`)
      this.dispatch(`${namespace}/clear`)
    },
    show (store) {
      this.commit(`${namespace}/show`)
    },
    hide (store) {
      this.commit(`${namespace}/hide`)
    },
    seen (store, id) {
      this.commit(`${namespace}/seen`, id)
    },
    append (store, item) {
      this.commit(`${namespace}/append`, item)
    },
    remove(store, id) {
      this.commit(`${namespace}/remove`, id)
    }
  }
}