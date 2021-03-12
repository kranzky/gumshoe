import List from './list.js'

class Location {
  constructor (store) {
    this.$store = store
    this.places = new List(store, 'places', 'room')
    this.people = new List(store, 'people', 'bot')
    this.objects = new List(store, 'objects', 'item')
  }

  _reset () {
    this.places._reset()
    this.people._reset()
    this.objects._reset()
  }
}

export default Location
