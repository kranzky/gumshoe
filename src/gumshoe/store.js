class Store {
  constructor (store) {
    this.$store = store
  }

  reset () {
    this.$store.dispatch("game/reset")
  }

  clear (component) {
    this.$store.dispatch(`${component}/clear`)
  }

  set (component, name, value) {
    this.$store.dispatch(`${component}/${name}`, value)
  }

  add (component, data) {
    this.$store.dispatch(`${component}/append`, data)
  }

  del (component, id) {
    this.$store.dispatch(`${component}/remove`, id)
  }

  delay (action) {
    this.$store.dispatch("progress/delay", action)
  }

  hide (name) {
    this.$store.commit(`${name}/loading`, true)
  }

  show (name) {
    this.$store.commit(`${name}/loading`, false)
  }
}
export default Store
