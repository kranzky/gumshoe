class Entity {
  constructor (store, component) {
    this.$store = store
    this.component = component
  }

  _clear () {
    this.$store.dispatch(`${this.component}/clear`)
  }

  _set (name, value) {
    this.$store.dispatch(`${this.component}/${name}`, value)
  }

  _append (data) {
    this.$store.dispatch(`${this.component}/append`, data)
  }

  _remove (id) {
    this.$store.dispatch(`${this.component}/remove`, id)
  }

  _show () {
    this.$store.dispatch(`${this.component}/show`)
  }

  _hide () {
    this.$store.dispatch(`${this.component}/hide`)
  }
}

export default Entity
