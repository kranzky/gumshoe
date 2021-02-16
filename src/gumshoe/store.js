class Store {
  constructor (store) {
    this.$store = store
  }

  reset () {
    console.debug('reset ui') // eslint-disable-line no-console
    this.$store.dispatch("game/reset")
  }

  clear (component) {
    console.debug(`clear ${component}`) // eslint-disable-line no-console
    this.$store.dispatch(`${component}/clear`)
  }

  set (component, name, value) {
    console.debug(`set ${component} ${name} to "${value}"`) // eslint-disable-line no-console
    this.$store.dispatch(`${component}/${name}`, value)
  }

  add (component, data) {
    console.debug(`add ${component} "${data.name || data.text}"`) // eslint-disable-line no-console
    this.$store.dispatch(`${component}/append`, data)
  }

  del (component, id) {
    console.debug(`del ${component} "${id}"`) // eslint-disable-line no-console
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
